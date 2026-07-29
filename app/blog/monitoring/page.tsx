import BlogSeriesList from "@/components/blog/blog-series-list";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "Monitoring Series | Aman Singh",
  description:
    "Instrumenting a real app with Prometheus and Grafana — the metrics mental model, dashboards that matter, and alerting that doesn't cry wolf, in order.",
};

export default async function MonitoringSeriesPage() {
  try {
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/blog"
          title="monitoring"
          description="Instrumenting a real app with Prometheus and Grafana — the metrics mental model, dashboards that matter, and alerting that doesn't cry wolf. Read in order, 1 through N."
          titleSize="sm"
          descriptionClassName="mb-12"
        />

        <AnimatedSection delay="0.6s">
          <BlogSeriesList category="monitoring" />
        </AnimatedSection>
      </main>
    );
  } catch (error) {
    console.error("Error in monitoring series page:", error);
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/blog"
          title="Error"
          description="There was an error loading this series. Please try again later."
          titleSize="sm"
        />
      </main>
    );
  }
}
