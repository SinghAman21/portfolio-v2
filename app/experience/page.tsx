import ExperienceItem from "@/components/ExperienceItem";
import PageHeader from "@/components/PageHeader";
import AnimatedListItem from "@/components/AnimatedListItem";
import { Experience } from "@/lib/data";
import { Metadata } from "next";


export default function Page() {
  const allExperiences = Experience;
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="experience"
        description="Companies I've worked with to deliver software solutions and drive technical growth of the company."
      />
      <div className="space-y-0">
        {allExperiences.map((experience, index) => (
          <AnimatedListItem key={index} index={index}>
            <ExperienceItem
              title={experience.title}
              company={experience.company}
              year={experience.year}
              description={experience.description}
              companySite={experience.companySite}
            />
          </AnimatedListItem>
        ))}
      </div>
    </main>
  )
}