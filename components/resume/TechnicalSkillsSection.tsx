interface TechnicalSkills {
  languages: string;
  frameworks: string;
  cloudPlatforms: string;
  runtimes: string;
  ormDatabase: string;
  tools: string;
  softSkills: string;
}

interface TechnicalSkillsSectionProps {
  skills: TechnicalSkills;
}

export default function TechnicalSkillsSection({ skills }: TechnicalSkillsSectionProps) {
  return (
    <section className="animate-[slideFadeUp_0.8s_ease-out]">
      <h2 className="text-xl font-medium text-gray-900 dark:text-neutral-100 mb-6">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 text-sm text-gray-600 dark:text-neutral-400">
        <div className="space-y-2">
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Languages:
            </span>{" "}
            {skills.languages}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Frameworks:
            </span>{" "}
            {skills.frameworks}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Cloud & Platforms:
            </span>{" "}
            {skills.cloudPlatforms}
          </p>
        </div>
        <div className="space-y-1">
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Runtimes:
            </span>{" "}
            {skills.runtimes}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              ORM and Database:
            </span>{" "}
            {skills.ormDatabase}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Tools:
            </span>{" "}
            {skills.tools}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Soft Skills:
            </span>{" "}
            {skills.softSkills}
          </p>
        </div>
      </div>
    </section>
  );
}
