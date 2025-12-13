interface VolunteerExperience {
  organization: string;
  title: string;
  location: string;
  period: string;
  points: string[];
}

interface VolunteerExperienceSectionProps {
  experience: VolunteerExperience;
}

export default function VolunteerExperienceSection({ experience }: VolunteerExperienceSectionProps) {
  return (
    <section className="animate-[slideFadeUp_0.7s_ease-out]">
      <h2 className="text-xl font-medium text-gray-900 dark:text-neutral-100 mb-6">
        Volunteer Experience
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-neutral-200">
              {experience.organization}
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              {experience.title}
            </p>
          </div>
          <div className="text-right text-gray-600 dark:text-neutral-500 text-sm">
            <p>{experience.location}</p>
            <p>{experience.period}</p>
          </div>
        </div>
        <div className="text-gray-600 dark:text-neutral-400 text-sm">
          {experience.points.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
