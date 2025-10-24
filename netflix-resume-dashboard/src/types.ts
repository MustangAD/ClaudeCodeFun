export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects?: Project[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  details?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}
