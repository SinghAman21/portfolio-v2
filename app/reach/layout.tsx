import { PropsWithChildren } from "react";
import { GeistMono } from "geist/font/mono";
import { Metadata } from "next";

import { cn } from "@/lib/utils";

const title = "Reach — Aman Singh";
const description =
  "Connect with Aman Singh across GitHub, LinkedIn, Peerlist, X, or email for software engineering, backend, infrastructure, and full-stack work.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: "https://singhaman.me/reach",
    images: [
      {
        url: "/reach/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aman Singh — Backend, Infrastructure, Full-Stack",
      },
    ],
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: ["/reach/opengraph-image"],
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
    canonical: "https://singhaman.me/reach",
  },
};

export default function ReachLayout({ children }: PropsWithChildren) {
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
