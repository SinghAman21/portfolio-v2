import { notFound } from "next/navigation";
import { Metadata } from "next";
import BackNavigation from "@/components/back-navigation";
import ComponentPreview from "@/components/experiments/component-preview";
import CodeBlock from "@/components/experiments/code-block";
import { MDXDropdown } from "@/components/experiments/mdx-dropdown";
import { getExperimentBySlug, getAllExperimentSlugs } from "@/lib/experiments-data";
import { readComponentCode } from "@/lib/read-component";
import { generateMDX } from "@/lib/generate-mdx";

// Import all experiment components
import { AnimatedCounter } from "@/components/experiments/animated-counter";
import { MagneticButton } from "@/components/experiments/magnetic-button";
import { TextScramble } from "@/components/experiments/text-scramble";
import { SpotlightCard } from "@/components/experiments/spotlight-card";
import { Typewriter } from "@/components/experiments/typewriter";
import { ExperimentItemDemo } from "@/components/experiments/experiment-item-demo";


// Component registry for dynamic rendering
const componentRegistry: Record<string, React.ReactNode> = {
  AnimatedCounter: (
    <div className="flex flex-col items-center gap-6">
      <div className="text-6xl font-bold text-gray-900 dark:text-white tabular-nums">
        <AnimatedCounter value={12847} />
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-3xl font-semibold text-gray-800 dark:text-neutral-200">
            <AnimatedCounter value={99} duration={2} />%
          </div>
          <div className="text-sm text-gray-500 dark:text-neutral-500">Completion</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-semibold text-gray-800 dark:text-neutral-200">
            <AnimatedCounter value={2500} formatOptions={{ notation: "compact" }} />
          </div>
          <div className="text-sm text-gray-500 dark:text-neutral-500">Users</div>
        </div>
      </div>
    </div>
  ),
  MagneticButton: (
    <MagneticButton strength={0.4}>
      <button className="px-8 py-4 bg-white dark:bg-neutral-200 text-gray-900 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow">
        Hover & move around me
      </button>
    </MagneticButton>
  ),
  TextScramble: (
    <div className="flex flex-col items-center gap-8">
      <TextScramble
        text="Hello, World!"
        className="text-4xl font-bold text-gray-900 dark:text-white"
      />
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-500 mb-2">Hover to scramble:</p>
        <TextScramble
          text="Interactive Text"
          trigger="hover"
          className="text-2xl font-semibold text-gray-800 dark:text-neutral-200 cursor-pointer"
        />
      </div>
    </div>
  ),
  SpotlightCard: (
    <SpotlightCard className="p-8 border border-gray-300 dark:border-neutral-700 rounded-2xl bg-white/50 dark:bg-neutral-900/50">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Spotlight Effect
      </h3>
      <p className="text-gray-600 dark:text-neutral-400 mb-4">
        Move your cursor around to see the spotlight follow.
        This creates a beautiful depth effect.
      </p>
      <div className="flex gap-2">
        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300">
          Interactive
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300">
          CSS-only
        </span>
      </div>
    </SpotlightCard>
  ),
  Typewriter: (
    <div className="text-center">
      <div className="text-3xl font-mono text-gray-900 dark:text-white mb-4">
        <Typewriter
          texts={["Hello, World!", "Welcome to experiments", "Build amazing UIs"]}
          typingSpeed={80}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-neutral-500">
        Cycles through multiple phrases
      </p>
    </div>
  ),
  ExperimentItem: (
    <div className="w-full max-w-2xl">
      <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4 text-center">
        Hover over the items below to see the corner markers
      </p>
      <div className="space-y-0">
        <ExperimentItemDemo
          title="Animated Counter"
          description="A smooth animated number counter with spring physics. Perfect for dashboards, stats displays, and gamification elements."
          year="2025"
        />
        <ExperimentItemDemo
          title="Magnetic Button"
          description="A button that responds to cursor proximity with a magnetic pull effect. Creates an engaging, playful interaction."
          year="2025"
        />
        <ExperimentItemDemo
          title="Text Scramble"
          description="A text effect that scrambles characters before revealing the final text. Great for headers and loading states."
          year="2025"
        />
      </div>
    </div>
  ),
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllExperimentSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    return { title: "Experiment Not Found" };
  }

  const experimentUrl = `https://www.AmanSingh.me/experiments/${slug}`;
  const featuresText = experiment.features?.join(", ") || "";
  const dependenciesText = experiment.dependencies?.join(", ") || "";

  return {
    title: `${experiment.title} — UI Experiment by Aman Singh`,
    description: `${experiment.description}${featuresText ? ` Features: ${featuresText}.` : ""}${dependenciesText ? ` Built with: ${dependenciesText}.` : ""}`,
    keywords: [
      experiment.title,
      "UI experiment",
      "React component",
      "Next.js",
      "TypeScript",
      ...(experiment.dependencies || []),
      "Aman Singh",
      "portfolio",
      "web development",
      "frontend",
    ],
    openGraph: {
      title: `${experiment.title} — UI Experiment by Aman Singh`,
      description: experiment.description,
      url: experimentUrl,
      images: ["/og-image.webp"],
      siteName: "Aman Singh",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${experiment.title} — UI Experiment by Aman Singh`,
      card: "summary_large_image",
      images: ["/og-image.webp"],
      description: experiment.description,
      creator: "@useraman21",
      site: "@useraman21",
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
      canonical: experimentUrl,
    },
  };
}

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  const PreviewComponent = componentRegistry[experiment.component];

  // Read the actual component code from the file system
  const componentCode = await readComponentCode(experiment.component);

  // Generate page URL (use .md for LLM prompts)
  const pageUrl = `https://www.AmanSingh.me/experiments/${slug}.md`;

  // Generate v0 registry URL (JSON endpoint)
  const v0RegistryUrl = `https://www.AmanSingh.me/api/experiments/${slug}`;

  // Generate MDX content
  const mdxContent = generateMDX(experiment, componentCode, experiment.usage);

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <BackNavigation href="/experiments">back</BackNavigation>

      {/* Header */}
      <div className="mt-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-serif font-semibold text-gray-900 dark:text-neutral-100 animate-[slideFadeUp_0.4s_ease-out]">
            {experiment.title}
          </h1>
          <div className="flex items-center gap-3 animate-[slideFadeUp_0.4s_ease-out]">
            <span className="text-sm text-gray-500 dark:text-neutral-500 tabular-nums">
              {experiment.year}
            </span>
            <MDXDropdown pageUrl={pageUrl} mdxContent={mdxContent} />
          </div>
        </div>
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed animate-[slideFadeUp_0.5s_ease-out]">
          {experiment.description}
        </p>
      </div>

      {/* Features */}
      {experiment.features && experiment.features.length > 0 && (
        <div
          className="mb-8 animate-[slideFadeUp_0.6s_ease-out]"
          style={{ animationFillMode: 'both' }}
        >
          <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 mb-3">
            Features
          </h2>
          <ul className="space-y-2">
            {experiment.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-neutral-400">
                <span className="text-gray-400 dark:text-neutral-600 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dependencies */}
      {experiment.dependencies && experiment.dependencies.length > 0 && (
        <div
          className="mb-8 animate-[slideFadeUp_0.65s_ease-out]"
          style={{ animationFillMode: 'both' }}
        >
          <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 mb-3">
            Dependencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {experiment.dependencies.map((dep: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 font-mono"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Component Preview */}
      <div
        className="mb-8 animate-[slideFadeUp_0.7s_ease-out]"
        style={{ animationFillMode: 'both' }}
      >
        <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 mb-3">
          Preview
        </h2>
        <ComponentPreview
          code={componentCode}
          title={`${experiment.component}.tsx`}
          pageUrl={pageUrl}
          v0Url={v0RegistryUrl}
        >
          {PreviewComponent}
        </ComponentPreview>
      </div>

      {/* Usage */}
      {experiment.usage && (
        <div
          className="mb-8 animate-[slideFadeUp_0.75s_ease-out]"
          style={{ animationFillMode: 'both' }}
        >
          <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100 mb-3">
            Usage
          </h2>
          <CodeBlock code={experiment.usage} title="Example" showLineNumbers={false} />
        </div>
      )}
    </main>
  );
}

