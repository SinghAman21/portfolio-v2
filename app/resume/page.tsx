"use client";

import BackNavigation from "@/components/back-navigation";
import ResumeActions from "@/components/resume/ResumeActions";
import ResumeHeader from "@/components/resume/ResumeHeader";
import WorkExperienceSection from "@/components/resume/WorkExperienceSection";
import ProjectsSection from "@/components/resume/ProjectsSection";
import VolunteerExperienceSection from "@/components/resume/VolunteerExperienceSection";
import TechnicalSkillsSection from "@/components/resume/TechnicalSkillsSection";
import EducationSection from "@/components/resume/EducationSection";
import {
  resumeWorkExperience,
  resumeProjects,
  volunteerExperience,
  technicalSkills,
  education,
} from "@/lib/resume-data";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto mb-32 text-gray-700 dark:text-neutral-400">
      <div className="print:hidden">
        <BackNavigation href="/">back</BackNavigation>
          </div>

      <ResumeActions />

      <div className="space-y-12">
        <ResumeHeader />

        <WorkExperienceSection experiences={resumeWorkExperience} />

        <ProjectsSection projects={resumeProjects} />

        <VolunteerExperienceSection experience={volunteerExperience} />

        <TechnicalSkillsSection skills={technicalSkills} />

        <EducationSection education={education} />
      </div>
    </div>
  );
}
