import { NextRequest } from "next/server";
import { getExperimentBySlug } from "@/lib/experiments-data";
import { readComponentCode } from "@/lib/read-component";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    return new Response(JSON.stringify({ error: "Experiment not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Read the component code
    const componentCode = await readComponentCode(experiment.component);

    // Generate example usage based on component type
    const getExampleUsage = (componentName: string): string => {
      switch (componentName) {
        case "AnimatedCounter":
          return `<${componentName} value={12847} />`;
        case "MagneticButton":
          return `<${componentName} strength={0.4}>\n      <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium shadow-lg">\n        Hover & move around me\n      </button>\n    </${componentName}>`;
        case "TextScramble":
          return `<${componentName} text="Hello, World!" className="text-4xl font-bold" />`;
        case "SpotlightCard":
          return `<${componentName} className="p-8 border rounded-2xl">\n      <h3 className="text-xl font-semibold mb-2">Spotlight Effect</h3>\n      <p className="text-gray-600">Move your cursor around to see the spotlight follow.</p>\n    </${componentName}>`;
        case "Typewriter":
          return `<${componentName} texts={["Hello, World!", "Welcome to experiments"]} typingSpeed={80} />`;
        case "ExperimentItem":
          return `<${componentName}\n      slug="example"\n      title="Example Item"\n      description="An example experiment item"\n      year="2025"\n    />`;
        default:
          return `<${componentName} />`;
      }
    };

    // Create app/page.tsx for Next.js App Router
    const pageTsxContent = `import ${experiment.component} from "@/components/${experiment.component}";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-50">
      ${getExampleUsage(experiment.component)}
    </div>
  );
}`;

    // Create app/layout.tsx for Next.js App Router
    // Escape quotes in strings for JSON
    const escapedTitle = experiment.title.replace(/"/g, '\\"');
    const escapedDescription = experiment.description.replace(/"/g, '\\"');

    const layoutTsxContent = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${escapedTitle}",
  description: "${escapedDescription}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}`;

    // Format as v0 registry item
    // Note: registryDependencies is for registry components only, not npm packages
    // npm packages go in dependencies array
    const registryItem = {
      name: experiment.component.toLowerCase(),
      type: "registry:ui",
      registryDependencies: [], // Empty - we don't have registry component dependencies
      files: [
        {
          type: "registry:file",
          path: "app/layout.tsx",
          target: "app/layout.tsx",
          content: layoutTsxContent,
        },
        {
          type: "registry:file",
          path: "app/page.tsx",
          target: "app/page.tsx",
          content: pageTsxContent,
        },
        {
          type: "registry:file",
          path: `components/${experiment.component}.tsx`,
          target: `components/${experiment.component}.tsx`,
          content: componentCode,
        },
      ],
      dependencies: experiment.dependencies || [], // npm packages like "motion"
      devDependencies: [],
      peerDependencies: [],
      description: experiment.description,
      features: experiment.features || [],
    };

    return new Response(JSON.stringify(registryItem, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error(`Failed to generate registry item for ${slug}:`, error);
    return new Response(JSON.stringify({ error: "Failed to generate registry item" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
