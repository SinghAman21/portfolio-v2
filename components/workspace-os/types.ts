import type { StyleGroup } from "@/components/illustration/types";

export type AppId = "desktop" | "design-inspo" | "files" | "notes" | "tools" | "settings";
export type WorkspaceState = {
  app: AppId;
  styleId: string;
  comparisonId: string;
  comparing: boolean;
  search: string;
  group: StyleGroup | "all";
  galleryOpen: boolean;
  terminalOpen: boolean;
  powered: boolean;
  noteId: string | null;
  fileFolder: string;
  dark: boolean;
};
export type WorkspaceActions = {
  openApp: (app: AppId) => void;
  update: (patch: Partial<WorkspaceState>) => void;
  selectStyle: (id: string) => void;
  toggleTerminal: () => void;
};
export type WorkspaceApp = { id: AppId; name: string; description: string; command: string };
