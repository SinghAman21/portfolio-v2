import ProjectItem from "@/components/ProjectItem";
import PageHeader from "@/components/PageHeader";
import AnimatedListItem from "@/components/AnimatedListItem";
import { projects } from "@/lib/data";
import { Metadata } from "next";



export default function Page() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="work"
        description="Batteleground of my personal projects that I've built to learn new technologies."
      />
      <div className="space-y-0">
        {projects.map((project, index) => (
          <AnimatedListItem key={index} index={index}>
            <ProjectItem
              title={project.title}
              description={project.description}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          </AnimatedListItem>
        ))}
      </div>
    </main>
  )
}
