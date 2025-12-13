import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { VideoSection } from "@/components/video-section";

export default function AboutPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="about"
        description="I started my programming journey in my 3rd year of college, beginning with Python and Java before diving deep into the JavaScript ecosystem. What began as building simple websites evolved into creating products that solve real-world problems."
      />
      <AnimatedSection delay="0.6s" className="mt-4 mb-4">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          Previously shipped features at DataFoundry AI, Dank, and other startups. I enjoy working in different environments — from intimate 3-person teams to larger organizations — and take pride in delivering quality software that makes a difference.
        </p>
      </AnimatedSection>
      <AnimatedSection delay="0.7s" className="mt-4 mb-4">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          Currently exploring new domains in technology while staying focused on building user-friendly applications that address real-world problems.
        </p>
      </AnimatedSection>
      <AnimatedSection delay="0.8s" className="mt-4 mb-8">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          If you don&apos;t want to read so much text, you can watch my video below.
        </p>
      </AnimatedSection>
      {/* <AnimatedSection delay="0.9s">
        <VideoSection />   FLAG: no intentions to create video as of now
      </AnimatedSection> */}  
      
    </main>
  );
}
