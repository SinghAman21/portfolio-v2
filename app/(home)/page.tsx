import WorkspaceOS from "@/components/workspace-os/WorkspaceOS";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Aman Singh — A Creative Workspace" },
  description: "Enter Aman Singh’s illustrated workspace. Explore design, projects, notes, and 27 visual languages through a custom desktop experience.",
  alternates: { canonical: "https://singhaman.me" },
};

export default function Home() {
  return <WorkspaceOS/>;
}
