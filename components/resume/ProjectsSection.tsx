interface Project {
  title: string;
  techStack: string;
  points: string[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="animate-[slideFadeUp_0.6s_ease-out]">
      <h2 className="text-xl font-medium text-gray-900 dark:text-neutral-100 mb-6">
        Projects
      </h2>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="space-y-2 animate-[slideFadeUp_0.7s_ease-out]"
            style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'both' }}
          >
            <div>
              <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-neutral-500 text-sm italic">
                {project.techStack}
              </p>
            </div>
            <div className="space-y-1 text-gray-600 dark:text-neutral-400 text-sm">
              {project.points.map((point, pointIndex) => (
                <p key={pointIndex}>{point}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
