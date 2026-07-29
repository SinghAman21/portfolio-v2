import BlogSeriesList from "@/components/blog/blog-series-list";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "DevOps & Kubernetes Series | Aman Singh",
  description:
    "Taking one app from a local cluster to production on Kubernetes — networking, storage, scaling, health checks, and disaster recovery, in order.",
};

export default async function DevopsSeriesPage() {
  try {
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/blog"
          title="devops"
          description="Taking one app from a local cluster to production on Kubernetes — networking, storage, scaling, health checks, and disaster recovery. Read in order, 1 through N."
          titleSize="sm"
          descriptionClassName="mb-12"
        />

        <AnimatedSection delay="0.6s">
          <BlogSeriesList category="devops" />
        </AnimatedSection>
      </main>
    );
  } catch (error) {
    console.error("Error in devops series page:", error);
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
