interface TechnicalSkills {
  languages: string;
  frontend: string;
  backend: string;
  aiDeveloperTools: string;
  cloudInfrastructure: string;
  databases: string;
  devOps: string;
  systemDesign: string;
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
              Frontend:
            </span>{" "}
            {skills.frontend}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Backend:
            </span>{" "}
            {skills.backend}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              AI & Developer Tools:
            </span>{" "}
            {skills.aiDeveloperTools}
          </p>
        </div>
        <div className="space-y-1">
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Cloud & Infrastructure:
            </span>{" "}
            {skills.cloudInfrastructure}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              Databases:
            </span>{" "}
            {skills.databases}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              DevOps:
            </span>{" "}
            {skills.devOps}
          </p>
          <p>
            <span className="text-gray-800 dark:text-neutral-200">
              System Design:
            </span>{" "}
            {skills.systemDesign}
          </p>
        </div>
      </div>
    </section>
  );
}
