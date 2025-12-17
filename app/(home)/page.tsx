import Anchor from '@/components/Anchor';
import Header from '@/components/Header';
import HomeLink from '@/components/HomeLink';
import QuoteBlock from '@/components/QuoteBlock';
import ReachSection from '@/components/ReachSection';
import AnimatedSection from '@/components/AnimatedSection';
import KeyboardHintButton from '@/components/KeyboardHintButton';
import { Experience, projects } from '@/lib/data';
import ProjectItem from '@/components/ProjectItem';
import ExperienceItem from '@/components/ExperienceItem';
import BlogList from '@/components/blog/blog-list';

export default function Home() {
  const recentProjects = projects.slice(0, 3);
  const recentExperiences = Experience.slice(0, 3);

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <KeyboardHintButton />
      <Header
        name="Aman Singh"
        location="Mumbai, India."
      />

      <AnimatedSection delay="0.05s" className="mt-6">
        <p className="text-gray-600 dark:text-stone-400 leading-relaxed">
          Full-stack developer currently improving myself.
          I build scalable web applications with Next.js, React, and Node.js that help businesses grow and solve real problems.
        </p>
      </AnimatedSection>

      {/* <AnimatedSection delay="0.08s" className="mt-6">
        <p className="text-gray-700 dark:text-neutral-400">One of my dev friend said this and now can't get this out of my mind.</p>
      </AnimatedSection> */}

      <QuoteBlock
        quote="You shall work hard enough to become better than yesterday's 'you'."
        animationDelay="0.11s"
      />

      {/* <HomeLink
          href="/experiments"
          label="experiments"
          description="Interactive components and UI experiments. Click to explore the code and see them in action."
          animationDelay="0.14s"
        /> */}

      <div>
        <HomeLink
          href="/experience"
          label="experience"
          description="Companies I've worked with to deliver software solutions and drive technical growth of the company."
          animationDelay="0.17s"
          shortcutKey="E"
        />

        <div
          className="animate-[slideFadeUp_0.35s_ease-out] pl-4 py-4"
          style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
          {recentExperiences.map((experience, index) => (
            <ExperienceItem
              key={index}
              title={experience.title}
              company={experience.company}
              year={experience.year}
              description={experience.description}
              companySite={experience.companySite}
            />
          ))}
        </div>
      </div>

      <div>
        <HomeLink
          href="/projects"
          label="work"
          description="Batteleground of my personal projects that I've built to learn new technologies."
          animationDelay="0.20s"
          shortcutKey="P"
        />
        <div
          className="animate-[slideFadeUp_0.35s_ease-out] pl-4 py-4"
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}>
          {recentProjects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>

      <div>
        <HomeLink
          href="/blog"
          label="writing"
          description="Thoughts, tutorials, and insights on web development, technology, and software engineering."
          animationDelay="0.23s"
          shortcutKey="B"
        />
        <div
          className="animate-[slideFadeUp_0.35s_ease-out] pl-4 py-4"
          style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
          <BlogList length={3} />
        </div>
      </div>

      <HomeLink
        href="/about"
        label="about"
        description="Learn more about my journey, background, and what drives me as a developer."
        animationDelay="0.26s"
        shortcutKey="A"
      />

      <ReachSection animationDelay="0.29s" />
    </main>
  );
}
