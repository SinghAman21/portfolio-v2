import { PropsWithChildren } from "react";
import { GeistMono } from "geist/font/mono";
import { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Workspace Desktop & Design Inspo — Aman Singh" },
  description:
    "Step inside Aman Singh’s illustrated workspace. Explore 27 illustration styles, open projects and notes, and navigate with a persistent terminal.",
  openGraph: {
    title: "Workspace Desktop & Design Inspo — Aman Singh",
    description:
      "One workspace, 27 visual languages. Explore, search, and compare independent illustration styles for the web.",
    images: ["/og-image.webp"],
    url: "https://singhaman.me/workspace",
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://singhaman.me/workspace" },
};

export default function WorkspaceLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        GeistMono.className,
        "mx-auto w-full max-w-[1360px] px-3 text-[13px] [text-rendering:geometricPrecision] sm:px-6",
      )}
    >
      {children}
    </div>
  );
}
