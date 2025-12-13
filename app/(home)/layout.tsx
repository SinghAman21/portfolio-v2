import { PropsWithChildren } from 'react';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aman Singh — Full-Stack Developer',
  description: 'Aman Singh is a full-stack software developer building scalable web applications. Explore projects, experience, and blog.',
  keywords: ['Aman Singh', 'full-stack developer', 'software engineer','backend engineer', 'Next.js', 'React', 'TypeScript', 'Node.js', 'web developer', 'portfolio', 'system design', 'India'],
  openGraph: {
    title: 'Aman Singh',
    description: 'Aman Singh is a developer who loves to code and build things.',
    images: ['/og-image.webp'],
    url: 'https://www.useraman.me',
    siteName: 'Aman Singh',
    locale: 'en_US',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Singh',
    description: 'Aman Singh is a developer who loves to code and build things.',
    images: ['/og-image.webp'],
    creator: '@useraman21',
    site: '@useraman21',
    siteId: '@useraman21',
  },
  alternates: {
    canonical: 'https://www.useraman.me',
  },
};




export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        GeistMono.className,
        'text-[13px] [text-rendering:geometricPrecision] container font-serif'
      )}>
      {children}
    </main>
  );
}