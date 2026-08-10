import { PropsWithChildren } from "react";
import { GeistMono } from "geist/font/mono";
import { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Open Source — Aman Singh" },
  description:
    "Public GitHub contributions by Aman Singh across community tools, documentation, and developer infrastructure.",
  openGraph: {
    title: "Open Source — Aman Singh",
    description:
      "Public GitHub contributions by Aman Singh across community tools, documentation, and developer infrastructure.",
    url: "https://singhaman.me/opensource",
    images: ["/og-image.webp"],
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Open Source — Aman Singh",
    card: "summary_large_image",
    images: ["/og-image.webp"],
    description:
      "Public GitHub contributions by Aman Singh across community tools, documentation, and developer infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://singhaman.me/opensource",
  },
};

export default function OpenSourceLayout({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        GeistMono.className,
        "text-[13px] [text-rendering:geometricPrecision] container",
      )}
    >
      {children}
    </main>
  );
}
