interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

interface EducationSectionProps {
  education: Education;
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="animate-[slideFadeUp_0.9s_ease-out]">
      <h2 className="text-xl font-medium text-gray-900 dark:text-neutral-100 mb-6">
        Education
      </h2>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-neutral-200">
            {education.institution}
          </h3>
          <p className="text-gray-600 dark:text-neutral-400">
            {education.degree}
          </p>
        </div>
        <div className="text-right text-gray-600 dark:text-neutral-500 text-sm">
          <p>{education.location}</p>
          <p>{education.period}</p>
        </div>
      </div>
    </section>
  );
}
