import { PropsWithChildren } from 'react';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects — Web Apps & Open Source by Aman Singh",
  description: "Explore web applications and open-source projects built by Aman Singh using Next.js, React, TypeScript, Go, and Node.js. From AI tools to real-time apps.",
  openGraph: {
    title: "Projects — Web Apps & Open Source by Aman Singh",
    description: "Explore web applications and open-source projects built by Aman Singh using Next.js, React, TypeScript, Go, and Node.js. From AI tools to real-time apps.",
    url: "https://www.AmanSingh.me/projects",
    images: ["/og-image.webp"],
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Projects — Web Apps & Open Source by Aman Singh",
    card: "summary_large_image",
    images: ["/og-image.webp"],
    description: "Explore web applications and open-source projects built by Aman Singh using Next.js, React, TypeScript, Go, and Node.js. From AI tools to real-time apps.",
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
    canonical: "https://www.AmanSingh.me/projects",
  },
};


export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        GeistMono.className,
        'text-[13px] [text-rendering:geometricPrecision] container'
      )}>
      {children}
    </main>
  );
}