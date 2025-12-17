import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { VideoSection } from "@/components/video-section";

export default function AboutPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="about"
        description="I’ve always been curious about how technology works and love taking things apart to understand what’s happening behind the scenes. That curiosity led me to programming during my junior college years, where I started experimenting with PHP and JavaScript and quickly got hooked on development."
      />
      <AnimatedSection delay="0.6s" className="mt-4 mb-4">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed text-justify">
          I’m currently pursuing my Bachelor’s degree in Information Technology, where I’ve built a strong foundation in coding and software development. I spent a year diving deep into the JavaScript ecosystem and completed a MERN stack course. Along the way, I realized that building applications alone wasn’t enough for me—I also wanted to understand how systems stay secure and how users safely interact with services.
        </p>
      </AnimatedSection>
      <AnimatedSection delay="0.7s" className="mt-4 mb-4">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed text-justify">
          Right now, I’m on a journey to become a well-rounded full-stack developer who can build, deploy, and monitor modern web applications. I enjoy learning something new every day, staying updated with tech trends, and constantly improving my skills. I’m excited to work on meaningful projects and continue growing as a developer.
        </p>
      </AnimatedSection>

      {/* <AnimatedSection delay="0.8s" className="mt-4 mb-8">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          If you don&apos;t want to read so much text, you can watch my video below.
        </p>
      </AnimatedSection> */}
      {/* <AnimatedSection delay="0.9s">
        <VideoSection />   FLAG: no intentions to create video as of now
      </AnimatedSection> */}

    </main>
  );
}
