import CornerMarkers from '@/components/CornerMarkers';

interface QuoteBlockProps {
  quote: string;
  animationDelay?: string;
}

export default function QuoteBlock({ quote, animationDelay = '0.05s' }: QuoteBlockProps) {
  return (
    <section
      className="mt-12 animate-[slideFadeUp_0.25s_ease-out] mb-12"
      style={{ animationDelay, animationFillMode: 'both' }}
    >
      <blockquote className="relative italic text-gray-700 dark:text-neutral-400 py-4 px-6 max-w-2xl mx-auto">
        <CornerMarkers variant="static" />
        <p className="leading-relaxed text-center">
          {quote}
        </p>
      </blockquote>
    </section>
  );
}
