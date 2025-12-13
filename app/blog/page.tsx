
import BlogList from "@/components/blog/blog-list";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";



export default async function BlogPage() {
  try {
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/"
          title="writing"
          description="I write about development techniques, project insights, and lessons learned building software."
          titleSize="sm"
          descriptionClassName="mb-12"
        />

        <AnimatedSection delay="0.6s">
          <BlogList />
        </AnimatedSection>
      </main>
    )
  } catch (error) {
    console.error("Error in blog page:", error)
    return (
      <main className="mb-32 text-gray-700 dark:text-neutral-400">
        <PageHeader
          backHref="/"
          title="Error"
          description="There was an error loading the blog posts. Please try again later."
          titleSize="sm"
        />
      </main>
    )
  }
}

