interface WorkExperience {
  company: string;
  title: string;
  location: string;
  period: string;
  points: string[];
}

interface WorkExperienceSectionProps {
  experiences: WorkExperience[];
}

export default function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
  return (
    <section className="animate-[slideFadeUp_0.5s_ease-out]">
      <h2 className="text-xl font-medium text-gray-900 dark:text-neutral-100 mb-6">
        Work Experience
      </h2>

      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="space-y-2 animate-[slideFadeUp_0.6s_ease-out]"
            style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                  {exp.company}
                </h3>
                <p className="text-gray-600 dark:text-neutral-400">
                  {exp.title}
                </p>
              </div>
              <div className="text-right text-gray-600 dark:text-neutral-500 text-sm">
                <p>{exp.location}</p>
                <p>{exp.period}</p>
              </div>
            </div>
            <div className="space-y-1 text-gray-600 dark:text-neutral-400 text-sm">
              {exp.points.map((point, pointIndex) => (
                <p key={pointIndex}>{point}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
