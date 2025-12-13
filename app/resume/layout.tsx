import { PropsWithChildren } from 'react';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';


export const metadata = {
  title: 'Resume — Aman Singh, Full-Stack Software Developer',
  description: 'Download or view the professional resume of Aman Singh. Skills in Next.js, React, TypeScript, Node.js, and full-stack web development. Based in India.',
  openGraph: {
    title: 'Resume — Aman Singh, Full-Stack Software Developer',
    description: 'Download or view the professional resume of Aman Singh. Skills in Next.js, React, TypeScript, Node.js, and full-stack web development. Based in India.',
    images: ['/og-image.webp'],
    url: 'https://AmanSingh.me/resume',
  },
  twitter: {
    title: 'Resume — Aman Singh, Full-Stack Software Developer',
    description: 'Download or view the professional resume of Aman Singh. Skills in Next.js, React, TypeScript, Node.js, and full-stack web development. Based in India.',
    images: ['/og-image.webp'],
  },
  alternates: {
    canonical: 'https://AmanSingh.me/resume',
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
}


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