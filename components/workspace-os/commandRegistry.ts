import { styleRegistry, filterStyles } from "@/components/illustration/styleRegistry";
import { appRegistry, workspaceTools } from "./appRegistry";
import type { AppId, WorkspaceState } from "./types";

export type CommandResult = { lines?: string[]; clear?: boolean };
export type CommandContext = {
  state: WorkspaceState;
  history: string[];
  openApp: (app: AppId) => void;
  selectStyle: (id: string) => void;
  update: (patch: Partial<WorkspaceState>) => void;
};
export type WorkspaceCommand = {
  name: string; aliases?: string[]; description: string; usage?: string;
  execute: (args: string[], context: CommandContext) => CommandResult;
};

// Add a command here; the terminal, help output, and completion all discover it.
export const commandRegistry: WorkspaceCommand[] = [
  { name: "help", aliases: ["?"], description: "List commands or explain one.", usage: "help [command]", execute(args) {
    if (args[0]) {
      const entry = commandRegistry.find(c => c.name === args[0] || c.aliases?.includes(args[0]));
      return { lines: entry ? [entry.usage ?? entry.name, entry.description] : [`No command named “${args[0]}”. Type help to see available commands.`] };
    }
    return { lines: ["Workspace commands", ...commandRegistry.map(c => `${(c.usage ?? c.name).padEnd(27)} ${c.description}`), "", "This is an application command hub. It does not run system commands."] };
  } },
  { name: "home", aliases: ["desktop"], description: "Return to the illustrated workspace.", execute: (_, c) => { c.openApp("desktop"); return { lines: ["Returned to workspace."] }; } },
  { name: "open", description: "Open a registered app or the terminal.", usage: "open <app>", execute(args, c) {
    const id = args.join(" ").toLowerCase();
    if (id === "terminal") { c.update({ terminalOpen: true }); return { lines: ["Terminal is already here."] }; }
    const app = appRegistry.find(a => a.id === id || a.name.toLowerCase() === id);
    if (!app) return { lines: [`Unknown application: ${id || "(none)"}.`, "Use apps to see available applications."] };
    c.openApp(app.id); return { lines: [`Opened ${app.name}.`] };
  } },
  { name: "apps", aliases: ["ls"], description: "List available applications.", execute: () => ({ lines: [...appRegistry.map(a => `${a.id.padEnd(16)} ${a.description}`), "terminal         Persistent command hub."] }) },
  { name: "styles", description: "List every numbered illustration style.", execute: () => ({ lines: styleRegistry.map(s => `${String(s.number).padStart(2, "0")}  ${s.name}`) }) },
  { name: "style", description: "Select a style by number, ID, or exact name.", usage: "style <number | name>", execute(args, c) {
    const query = args.join(" ").toLowerCase();
    const entry = styleRegistry.find(s => String(s.number) === query.replace(/^0+/, "") || s.id === query || s.name.toLowerCase() === query);
    if (!entry) return { lines: [`Style not found: ${query || "(none)"}. Use styles for all ${styleRegistry.length} entries.`] };
    c.selectStyle(entry.id); return { lines: [`${String(entry.number).padStart(2, "0")} / ${entry.name}`, entry.description] };
  } },
  { name: "search", description: "Search styles and open the filtered gallery.", usage: "search <words>", execute(args, c) {
    const query = args.join(" ");
    const matches = filterStyles(query, "all");
    c.update({ app: "design-inspo", search: query, group: "all", galleryOpen: true, ...(matches[0] ? { styleId: matches[0].id } : {}) });
    return { lines: [`${matches.length} styles found${query ? ` for “${query}”` : ""}.`, ...matches.map(s => `${String(s.number).padStart(2, "0")}  ${s.name}`)] };
  } },
  { name: "tools", description: "List the tools on this desk.", execute: () => ({ lines: workspaceTools.map(t => `${t.name.padEnd(13)} ${t.purpose}`) }) },
  { name: "power", description: "Inspect or toggle the simulated wall socket.", usage: "power [on | off | toggle]", execute(args, c) {
    const choice = args[0]?.toLowerCase();
    if (choice && !["on", "off", "toggle"].includes(choice)) return { lines: ["Usage: power [on | off | toggle]"] };
    const powered = choice === "on" ? true : choice === "off" ? false : choice === "toggle" ? !c.state.powered : c.state.powered;
    if (choice) c.update({ powered });
    return { lines: [`Socket ${powered ? "ON · laptop and phone charging" : "OFF · connected, not charging"}.`, "Both charging cables remain plugged in."] };
  } },
  { name: "history", description: "Show commands from this browser session.", execute: (_, c) => ({ lines: c.history.length ? c.history.map((line, i) => `${String(i + 1).padStart(3, " ")}  ${line}`) : ["No commands yet."] }) },
  { name: "clear", aliases: ["cls"], description: "Clear terminal output.", execute: () => ({ clear: true }) },
  { name: "exit", aliases: ["close"], description: "Hide the terminal; keep its session.", execute: (_, c) => { c.update({ terminalOpen: false }); return { lines: ["Session kept. Use Ctrl + ` to return."] }; } },
];

export function parseCommand(input: string): string[] {
  const parts: string[] = [];
  let token = "", quote = "", inToken = false;
  for (const char of input.trim()) {
    if (quote) { if (char === quote) quote = ""; else token += char; }
    else if (char === '"' || char === "'") { quote = char; inToken = true; }
    else if (/\s/.test(char)) { if (inToken) { parts.push(token); token = ""; inToken = false; } }
    else { token += char; inToken = true; }
  }
  if (quote) throw new Error("Close the quoted argument before running the command.");
  if (inToken) parts.push(token);
  return parts;
}

export function executeCommand(input: string, context: CommandContext): CommandResult {
  try {
    const [name, ...args] = parseCommand(input);
    if (!name) return {};
    const command = commandRegistry.find(c => c.name === name.toLowerCase() || c.aliases?.includes(name.toLowerCase()));
    if (command) return command.execute(args, context);
    const suggestion = commandRegistry.find(c => c.name.startsWith(name.slice(0, 2).toLowerCase()));
    return { lines: [`Command not found: ${name}.${suggestion ? ` Did you mean “${suggestion.name}”?` : ""}`, "Type help for available commands. Arbitrary shell commands are not supported."] };
  } catch (error) { return { lines: [error instanceof Error ? error.message : "The command could not be completed."] }; }
}
