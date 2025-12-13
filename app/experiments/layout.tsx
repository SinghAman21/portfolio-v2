import type { Metadata } from "next";
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Experiments — UI Experiments by Aman Singh",
  description: "Explore UI experiments built by Aman Singh using Next.js, React, TypeScript, Go, and Node.js.",
  keywords: ["UI experiments", "Next.js", "React", "TypeScript", "Go", "Node.js", "Aman Singh", "portfolio", "projects", "blog", "India"],
  openGraph: {
    title: "Experiments — UI Experiments by Aman Singh",
    description: "Explore UI experiments built by Aman Singh.",
    url: "https://www.AmanSingh.me/experiments",
    images: ["/og-image.webp"],
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Experiments — UI Experiments by Aman Singh",
    card: "summary_large_image",
    images: ["/og-image.webp"],
    description: "Explore UI experiments built by Aman Singh.",
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
    canonical: "https://www.AmanSingh.me/experiments",
  },
};

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        GeistMono.className,
        'text-[13px] [text-rendering:geometricPrecision] container font-serif'
      )}>
      {children}
    </div>
  );
}

