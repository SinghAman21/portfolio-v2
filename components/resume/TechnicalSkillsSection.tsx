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

interface Certification {
  name: string;
  score: string;
  verificationUrl: string;
}

interface TechnicalSkillsSectionProps {
  skills: TechnicalSkills;
  certifications: Certification[];
}

export default function TechnicalSkillsSection({
  skills,
  certifications,
}: TechnicalSkillsSectionProps) {
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

      <div className="mt-8">
        <h3 className="mb-3 text-base font-medium text-gray-900 dark:text-neutral-100">
          Certifications
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {certifications.map((certification) => (
            <div
              key={certification.name}
              className="flex items-start justify-between gap-4 text-sm text-gray-600 dark:text-neutral-400"
            >
              <strong className="font-medium text-gray-800 dark:text-neutral-200">
                {certification.name}
              </strong>
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 underline underline-offset-2 transition-colors hover:text-gray-900 dark:hover:text-neutral-100"
              >
                {certification.score}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
