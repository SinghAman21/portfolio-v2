export type PRStatus = "merged" | "open" | "closed";

export interface OpenSourcePR {
  title: string;
  repo: string;
  prUrl: string;
  status: PRStatus;
  year: string;
  description: string;
}

export interface Acknowledgment {
  title: string;
  description: string;
  url: string;
  date: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ExperienceEntry {
  title: string;
  year: string;
  company: string;
  description: string[];
  companySite: string;
}