import Anchor from '@/components/Anchor';
import AnimatedSection from '@/components/AnimatedSection';

interface ReachSectionProps {
  animationDelay?: string;
}

export default function ReachSection({ animationDelay = '1.2s' }: ReachSectionProps) {
  return (
    <AnimatedSection delay={animationDelay} className="mt-12">
      <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100">reach</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="whitespace-nowrap text-gray-700 dark:text-neutral-400">
          <span>connect on </span>
          <Anchor href="https://x.com/useraman21" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:scale-105 inline-block">
            {'𝕏'}
          </Anchor>
          <span className="mx-1 text-gray-400 dark:text-neutral-400/50 transition-opacity duration-200">·</span>
          <Anchor href="https://github.com/SinghAman21" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:scale-105 inline-block">
            GitHub
          </Anchor>
          <span className="mx-1 text-gray-400 dark:text-neutral-400/50 transition-opacity duration-200">·</span>
          <Anchor href="https://www.linkedin.com/in/aman-singh21/" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:scale-105 inline-block">
            LinkedIn
          </Anchor>
          <span className="mx-1 text-gray-400 dark:text-neutral-400/50 transition-opacity duration-200">·</span>
          <Anchor href="https://peerlist.io/singhaman21/" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:scale-105 inline-block">
            Peerlist
          </Anchor>
          <span className="mx-1 text-gray-400 dark:text-neutral-400/50 transition-opacity duration-200">·</span>
          {/* <Anchor href="https://cal.com/singhaman21" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:scale-105 inline-block">
            Cal.com
          </Anchor> */}
        </span>
        <span className="text-gray-700 dark:text-neutral-400">
          — or send me an email at{" "}
          <Anchor href="mailto:singhaman21@proton.me" target="_blank" className="transition-all duration-200 hover:opacity-70 hover:underline underline-offset-2">
            singhaman21@proton.me
          </Anchor>
        </span>
      </div>
    </AnimatedSection>
  );
}

