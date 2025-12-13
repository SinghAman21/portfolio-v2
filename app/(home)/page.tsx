import Anchor from '@/components/Anchor';
import Header from '@/components/Header';
import HomeLink from '@/components/HomeLink';
import QuoteBlock from '@/components/QuoteBlock';
import ReachSection from '@/components/ReachSection';
import AnimatedSection from '@/components/AnimatedSection';
import { Experience, projects } from '@/lib/data';
import ProjectItem from '@/components/ProjectItem';
import ExperienceItem from '@/components/ExperienceItem';
import BlogList from '@/components/blog/blog-list';

export default function Home() {
  const recentProjects = projects.slice(0, 3);
  const recentExperiences = Experience.slice(0, 3);

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <Header
        name="Aman Singh"
        location="Mumbai, India."
      />

      <AnimatedSection delay="0.05s" className="mt-6">
        <p className="text-gray-600 dark:text-stone-400 leading-relaxed">
          Full-stack developer currently working at{' '}
          <Anchor href="https://www.superalign.ai" target="_blank" className="transition-all duration-200 hover:opacity-80">SuperAlign AI</Anchor>.
          I build scalable web applications with Next.js, React, and Node.js that help businesses grow and solve real problems.
        </p>
      </AnimatedSection>

      <AnimatedSection delay="0.08s" className="mt-6">
        <p className="text-gray-700 dark:text-neutral-400">This is something I remind myself of every day.</p>
      </AnimatedSection>

      <QuoteBlock
        quote="Every morning you have two choices: Continue to sleep with your dreams or wake up and chase them 💪🏻"
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
        />
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

      <div>
        <HomeLink
          href="/projects"
          label="work"
          description="Batteleground of my personal projects that I've built to learn new technologies."
          animationDelay="0.20s"
        />
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

      <div>
        <HomeLink
          href="/blog"
          label="writing"
          description="Thoughts, tutorials, and insights on web development, technology, and software engineering."
          animationDelay="0.23s"
        />
        <BlogList length={3}/>
      </div>

      <HomeLink
        href="/about"
        label="about"
        description="Learn more about my journey, background, and what drives me as a developer."
        animationDelay="0.26s"
      />

      <ReachSection animationDelay="0.29s" />
    </main>
  );
}
