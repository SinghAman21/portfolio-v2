import Anchor from '@/components/Anchor';
import Link from 'next/link';
import Header from '@/components/Header';
import HomeLink from '@/components/HomeLink';
import SiteNav from '@/components/SiteNav';
import QuoteBlock from '@/components/QuoteBlock';
import ReachSection from '@/components/ReachSection';
import AnimatedSection from '@/components/AnimatedSection';
import KeyboardHintButton from '@/components/KeyboardHintButton';
import { Experience, projects } from '@/lib/data';
import ProjectItem from '@/components/ProjectItem';
import ExperienceItem from '@/components/ExperienceItem';
import BlogList from '@/components/blog/blog-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Portfolio — Aman Singh' },
  alternates: { canonical: 'https://singhaman.me/portfolio' },
};

export default function Home() {
  const recentProjects = projects.slice(0, 3);
  const recentExperiences = Experience.slice(0, 2);

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <KeyboardHintButton />
      <SiteNav />
      <Header
        name="Aman Singh"
        location="Mumbai, India."
        showResume={false}
      />

      <AnimatedSection delay="0.05s" className="mt-6">
        <p className="text-gray-600 dark:text-stone-400 leading-relaxed">
          I build backend systems, developer tools, and thoughtful web products. <br />
          I move between architecture, infrastructure, and interfaces — usually starting with a rough question and ending with something useful.
        </p>
        <Link href="/reach" className="mt-4 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-neutral-500 transition hover:text-gray-900 dark:hover:text-neutral-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          currently open to thoughtful product and engineering work
        </Link>
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
          description="Organizations I've partnered with to create software solutions and enhance their technical capabilities."
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
          description="A sandbox of my personal projects developed to explore and master new technologies."
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
          description="Documents which contain my reflections as a growing developer and engineer."
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
        href="/opensource"
        label="open source"
        description="Public GitHub contributions across community tools, documentation, and developer infrastructure."
        animationDelay="0.25s"
        shortcutKey="O"
      />

      <HomeLink
        href="/workspace"
        label="workspace"
        description="The hardware, tools, and AI systems I use to think, prototype, write, and ship."
        animationDelay="0.255s"
        shortcutKey="W"
      />

      <HomeLink
        href="/products"
        label="products"
        description="Useful developer products with straightforward one-time pricing and delivery."
        animationDelay="0.26s"
        shortcutKey="S"
      />

      <HomeLink
        href="/about"
        label="about"
        description="See yourself about me and how I reached the current stage of my journey as a developer."
        animationDelay="0.27s"
        shortcutKey="A"
      />

      <ReachSection animationDelay="0.29s" />
    </main>
  );
}
