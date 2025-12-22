import { PropsWithChildren } from 'react';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Experience — Professional Work History of Aman Singh",
  description: "Professional experience of Aman Singh as a software engineer at EaslegalPartners and many early startups more. Full-stack development roles and achievements.",
  openGraph: {
    title: "Experience — Professional Work History of Aman Singh",
    description: "Professional experience of Aman Singh as a software engineer at EaslegalPartners and many early startups more. Full-stack development roles and achievements.",
    url: "https://www.useraman.me/experience",
    images: ["/og-image.webp"],
    siteName: "Aman Singh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Experience — Professional Work History of Aman Singh",
    card: "summary_large_image",
    images: ["/og-image.webp"],
    description: "Professional experience of Aman Singh as a software engineer at EaslegalPartners and many early startups more. Full-stack development roles and achievements.",
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
    canonical: "https://www.useraman.me/experience",
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