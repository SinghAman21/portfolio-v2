const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const root = path.resolve(__dirname, "..");

// Use the app's installed TypeScript compiler; no separate test dependencies.
for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    });
    module._compile(result.outputText, filename);
  };
}
require.extensions[".css"] = () => {};
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, request.slice(2)) : request, ...args);
};

const { initialWorkspaceState, sanitizeState, stateFromUrl, urlForState } = require("../components/workspace-os/useWorkspaceState.ts");
const { executeCommand, parseCommand, commandRegistry } = require("../components/workspace-os/commandRegistry.ts");
const { styleRegistry } = require("../components/illustration/styleRegistry.ts");
const { appRegistry } = require("../components/workspace-os/appRegistry.ts");

function context(patch = {}) {
  const state = { ...initialWorkspaceState, ...patch };
  return {
    state,
    history: ["help", "style 3"],
    openApp(app) { state.app = app; },
    selectStyle(styleId) { state.app = "design-inspo"; state.styleId = styleId; },
    update(patch) { Object.assign(state, patch); },
  };
}

test("all 27 styles are selectable by number, ID, and exact quoted name", () => {
  assert.equal(styleRegistry.length, 27);
  assert.equal(new Set(styleRegistry.map(s => s.id)).size, 27);
  for (const style of styleRegistry) {
    for (const arg of [String(style.number), style.id, `"${style.name}"`]) {
      const c = context({ terminalOpen: true });
      const result = executeCommand(`style ${arg}`, c);
      assert.equal(c.state.styleId, style.id);
      assert.equal(c.state.app, "design-inspo");
      assert.equal(c.state.terminalOpen, true);
      assert.ok(result.lines.some(line => line.includes(style.name)));
    }
  }
});

test("application navigation preserves style, search, power and terminal", () => {
  const c = context({ styleId: "photobashing", search: "ink", terminalOpen: true, powered: false });
  for (const app of appRegistry) {
    executeCommand(`open ${app.id}`, c);
    assert.equal(c.state.app, app.id);
    assert.equal(c.state.styleId, "photobashing");
    assert.equal(c.state.search, "ink");
    assert.equal(c.state.terminalOpen, true);
    assert.equal(c.state.powered, false);
  }
  executeCommand("home", c);
  assert.equal(c.state.app, "desktop");
});

test("search matches registry metadata and opens a usable filtered application", () => {
  const c = context();
  const result = executeCommand("search blueprint", c);
  assert.equal(c.state.app, "design-inspo");
  assert.equal(c.state.search, "blueprint");
  assert.equal(c.state.group, "all");
  assert.equal(c.state.galleryOpen, true);
  assert.equal(c.state.styleId, "blueprint");
  assert.ok(result.lines.some(line => line.includes("Blueprint")));
  const before = c.state.styleId;
  assert.ok(executeCommand("search zzzzunmatchable", c).lines[0].includes("0 styles"));
  assert.equal(c.state.styleId, before);
});

test("power changes only simulated charging and supports on, off and toggle", () => {
  const c = context({ app: "design-inspo", styleId: "clay" });
  executeCommand("power off", c);
  assert.equal(c.state.powered, false);
  assert.ok(executeCommand("power", c).lines[0].includes("connected, not charging"));
  executeCommand("power toggle", c);
  assert.equal(c.state.powered, true);
  executeCommand("power on", c);
  assert.equal(c.state.styleId, "clay");
  assert.equal(c.state.app, "design-inspo");
  assert.ok(executeCommand("power invalid", c).lines[0].includes("Usage"));
});

test("parser supports quotes, whitespace, and useful invalid-input feedback", () => {
  assert.deepEqual(parseCommand('  style "Technical Ink Illustration"  '), ["style", "Technical Ink Illustration"]);
  assert.deepEqual(parseCommand("  "), []);
  assert.ok(executeCommand('style "unfinished', context()).lines[0].includes("quoted"));
  for (const command of ["rm -rf /", "style 999", "open missing-app", "unknown"]) {
    const c = context();
    const before = JSON.stringify(c.state);
    assert.ok(executeCommand(command, c).lines.length > 0);
    assert.equal(JSON.stringify(c.state), before);
  }
});

test("help, aliases, history, clear, tools, and terminal reopening work", () => {
  const c = context();
  const help = executeCommand("help", c).lines.join("\n");
  for (const entry of commandRegistry) assert.ok(help.includes(entry.name));
  assert.ok(executeCommand("help style", c).lines[0].startsWith("style"));
  assert.ok(executeCommand("history", c).lines.join("\n").includes("style 3"));
  assert.equal(executeCommand("cls", c).clear, true);
  assert.ok(executeCommand("tools", c).lines.some(line => line.includes("Zed")));
  executeCommand("open terminal", c); assert.equal(c.state.terminalOpen, true);
  executeCommand("exit", c); assert.equal(c.state.terminalOpen, false);
  assert.equal(executeCommand("ls", c).lines.length, appRegistry.length + 1);
});

test("future commands are discovered without changing terminal execution", () => {
  const entry = { name: "future-tool", aliases: ["ft"], description: "A registered extension.", execute: args => ({ lines: [args.join(" ")] }) };
  commandRegistry.push(entry);
  try {
    assert.deepEqual(executeCommand('ft "one argument"', context()).lines, ["one argument"]);
    assert.ok(executeCommand("help", context()).lines.some(line => line.includes("future-tool")));
  } finally { commandRegistry.pop(); }
});

test("URL roundtrip preserves application, selection, filters and comparison", () => {
  const saved = { ...initialWorkspaceState, app: "design-inspo", styleId: "photobashing", comparisonId: "vintage-engraving", comparing: true, group: "E", search: "photographic", terminalOpen: true, powered: false };
  const url = urlForState(new URL("https://example.com/workspace?utm_source=test"), saved);
  assert.equal(url.searchParams.get("style"), "27");
  assert.equal(url.searchParams.get("utm_source"), "test");
  const restored = stateFromUrl(url, saved);
  for (const key of ["app", "styleId", "comparisonId", "comparing", "group", "search", "terminalOpen", "powered"]) assert.equal(restored[key], saved[key]);
  assert.equal(stateFromUrl(new URL("https://example.com/?style=3"), initialWorkspaceState).app, "design-inspo");
  const direct = stateFromUrl(new URL("https://example.com/?app=design-inspo&style=3"), saved);
  assert.equal(direct.search, "");
  assert.equal(direct.group, "all");
  assert.equal(stateFromUrl(new URL("https://example.com/"), saved).app, "desktop");
  const home = urlForState(url, { ...saved, app: "desktop" });
  assert.equal(home.searchParams.has("app"), false);
  assert.equal(home.searchParams.has("style"), false);
});

test("invalid persisted state and invalid URLs recover safely", () => {
  assert.deepEqual(sanitizeState(null), initialWorkspaceState);
  const restored = sanitizeState({ app: "missing", styleId: "missing", group: "Z", terminalOpen: "yes", search: "x".repeat(999) });
  assert.equal(restored.app, "desktop");
  assert.equal(restored.styleId, "technical-ink");
  assert.equal(restored.group, "all");
  assert.equal(restored.terminalOpen, false);
  assert.equal(restored.search.length, 200);
  assert.equal(stateFromUrl(new URL("https://example.com/?app=missing&style=999&group=Z"), initialWorkspaceState).app, "desktop");
});

test("desktop and all application states server-render with working local artwork references", () => {
  const WorkspaceOS = require("../components/workspace-os/WorkspaceOS.tsx").default;
  const desktop = renderToStaticMarkup(React.createElement(WorkspaceOS));
  assert.ok(desktop.includes('id="workspace-laptop-screen"'));
  assert.ok(desktop.includes("Application dock"));
  assert.ok(desktop.includes('role="switch"'));
  assert.ok(!desktop.includes("skeleton-run"));
  assert.ok(fs.existsSync(path.join(root, "public/illustration/workspace-desktop.webp")));
  const DesignInspo = require("../components/workspace-os/DesignInspo.tsx").default;
  const app = renderToStaticMarkup(React.createElement(DesignInspo, { state: { ...initialWorkspaceState, app: "design-inspo" }, update() {}, reducedMotion: true }));
  assert.equal((app.match(/class="di-style-entry /g) || []).length, 27);
  assert.ok(app.includes("Best suited for:"));
  const comparison = renderToStaticMarkup(React.createElement(DesignInspo, { state: { ...initialWorkspaceState, comparing: true }, update() {}, reducedMotion: true }));
  assert.equal((comparison.match(/class="di-demo-side"/g) || []).length, 2);
  const { FilesApp, NotesApp, ToolsApp, SettingsApp } = require("../components/workspace-os/UtilityApps.tsx");
  for (const folder of ["home", "projects", "writing", "resources"]) assert.ok(renderToStaticMarkup(React.createElement(FilesApp, { folder, setFolder() {}, openApp() {} })).length > 100);
  for (const App of [NotesApp, ToolsApp]) assert.ok(renderToStaticMarkup(React.createElement(App)).length > 100);
  assert.ok(renderToStaticMarkup(React.createElement(SettingsApp, { state: initialWorkspaceState, update() {}, reset() {} })).includes("Wall power"));
});
