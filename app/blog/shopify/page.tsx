import BlogSeriesList from "@/components/blog/blog-series-list";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "Shopify Series | Aman Singh",
  description:
    "Building a real Shopify storefront end to end — themes, Liquid, the app-proxy bridge, and a run of production features, in order.",
};

export default async function ShopifySeriesPage() {
  try {
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/blog"
          title="shopify"
          description="Building a real Shopify storefront end to end — themes, Liquid, the app-proxy bridge, and a run of production features. Read in order, 1 through 16."
          titleSize="sm"
          descriptionClassName="mb-12"
        />

        <AnimatedSection delay="0.6s">
          <BlogSeriesList category="shopify" />
        </AnimatedSection>
      </main>
    );
  } catch (error) {
    console.error("Error in shopify series page:", error);
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
