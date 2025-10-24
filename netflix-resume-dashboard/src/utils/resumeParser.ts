import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import type { ResumeData, Experience, Education, Project } from '../types';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parseResume(file: File): Promise<ResumeData> {
  let text = '';

  if (file.type === 'application/pdf') {
    text = await parsePDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await parseDOCX(file);
  } else if (file.type === 'text/plain') {
    text = await file.text();
  } else {
    throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT file.');
  }

  return extractResumeData(text);
}

async function parsePDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

async function parseDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

function extractResumeData(text: string): ResumeData {
  // Basic parsing logic - extracts common resume sections
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // Extract name (usually first line or prominent at top)
  const name = extractName(lines);

  // Extract contact information
  const email = extractEmail(text);
  const phone = extractPhone(text);
  const linkedin = extractLinkedIn(text);
  const github = extractGitHub(text);

  // Extract sections
  const experience = extractExperience(text);
  const education = extractEducation(text);
  const skills = extractSkills(text);
  const projects = extractProjects(text);

  // Generate title from first job position or make an educated guess
  const title = experience.length > 0 ? experience[0].position : 'Professional';

  // Extract or generate summary
  const summary = extractSummary(text, experience, skills);

  return {
    name,
    title,
    summary,
    email,
    phone,
    linkedin,
    github,
    skills,
    experience,
    education,
    projects: projects.length > 0 ? projects : undefined,
  };
}

function extractName(lines: string[]): string {
  // First non-empty line is usually the name
  if (lines.length > 0) {
    const firstLine = lines[0];
    // Name is usually short and doesn't contain common resume keywords
    if (firstLine.length < 50 && !/(resume|cv|curriculum|vitae)/i.test(firstLine)) {
      return firstLine;
    }
  }
  return 'Professional Name';
}

function extractEmail(text: string): string | undefined {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : undefined;
}

function extractPhone(text: string): string | undefined {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : undefined;
}

function extractLinkedIn(text: string): string | undefined {
  const linkedInRegex = /(linkedin\.com\/in\/[\w-]+)/i;
  const match = text.match(linkedInRegex);
  return match ? match[1] : undefined;
}

function extractGitHub(text: string): string | undefined {
  const githubRegex = /(github\.com\/[\w-]+)/i;
  const match = text.match(githubRegex);
  return match ? match[1] : undefined;
}

function extractExperience(text: string): Experience[] {
  const experience: Experience[] = [];
  const sections = text.split(/\n\n+/);

  let inExperienceSection = false;

  for (const section of sections) {
    if (/experience|work\s+history|employment/i.test(section)) {
      inExperienceSection = true;
      continue;
    }

    if (inExperienceSection && /education|skills|projects/i.test(section)) {
      break;
    }

    if (inExperienceSection) {
      const lines = section.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length >= 3) {
        // Attempt to parse job entry
        const dateRegex = /\d{4}|present|current/i;
        const positionLine = lines.find(l => !dateRegex.test(l) && l.length > 5);
        const durationLine = lines.find(l => dateRegex.test(l));

        if (positionLine) {
          experience.push({
            company: lines[0] || 'Company Name',
            position: positionLine,
            duration: durationLine || '2020 - Present',
            description: lines.slice(2).filter(l => l.length > 10),
          });
        }
      }
    }
  }

  // If no experience found, create sample data
  if (experience.length === 0) {
    experience.push({
      company: 'Tech Company',
      position: 'Software Engineer',
      duration: '2020 - Present',
      description: ['Developed and maintained software applications', 'Collaborated with cross-functional teams'],
    });
  }

  return experience;
}

function extractEducation(text: string): Education[] {
  const education: Education[] = [];
  const sections = text.split(/\n\n+/);

  let inEducationSection = false;

  for (const section of sections) {
    if (/education|academic|university|college/i.test(section)) {
      inEducationSection = true;
      continue;
    }

    if (inEducationSection && /experience|skills|projects/i.test(section)) {
      break;
    }

    if (inEducationSection) {
      const lines = section.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length >= 2) {
        const dateRegex = /\d{4}/;
        const degreeLine = lines.find(l => /(bachelor|master|phd|b\.s\.|m\.s\.|degree)/i.test(l));
        const durationLine = lines.find(l => dateRegex.test(l));

        education.push({
          institution: lines[0] || 'University',
          degree: degreeLine || 'Bachelor of Science',
          duration: durationLine || '2016 - 2020',
        });
      }
    }
  }

  if (education.length === 0) {
    education.push({
      institution: 'University',
      degree: 'Bachelor of Science',
      duration: '2016 - 2020',
    });
  }

  return education;
}

function extractSkills(text: string): string[] {
  const skills: string[] = [];
  const skillsSection = text.match(/skills?[:\s]+([\s\S]*?)(?=\n\n|experience|education|projects|$)/i);

  if (skillsSection) {
    const skillsText = skillsSection[1];
    // Common separators: comma, bullet, pipe, newline
    const extracted = skillsText.split(/[,•||\n]/).map(s => s.trim()).filter(s => s && s.length < 30);
    skills.push(...extracted);
  }

  // Also look for common tech keywords
  const commonSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker', 'Git'];
  for (const skill of commonSkills) {
    if (text.includes(skill) && !skills.includes(skill)) {
      skills.push(skill);
    }
  }

  return skills.slice(0, 15); // Limit to 15 skills
}

function extractProjects(text: string): Project[] {
  const projects: Project[] = [];
  const sections = text.split(/\n\n+/);

  let inProjectsSection = false;

  for (const section of sections) {
    if (/projects?|portfolio/i.test(section)) {
      inProjectsSection = true;
      continue;
    }

    if (inProjectsSection && /experience|education|skills/i.test(section)) {
      break;
    }

    if (inProjectsSection) {
      const lines = section.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length >= 2) {
        projects.push({
          name: lines[0],
          description: lines.slice(1).join(' '),
          technologies: [],
        });
      }
    }
  }

  return projects;
}

function extractSummary(text: string, experience: Experience[], skills: string[]): string {
  // Look for summary/about section
  const summarySection = text.match(/(summary|about|profile|objective)[:\s]+([\s\S]*?)(?=\n\n|experience|education|skills|$)/i);

  if (summarySection) {
    return summarySection[2].trim().substring(0, 300);
  }

  // Generate a basic summary
  const yearsExp = experience.length > 0 ? 'Experienced' : 'Skilled';
  const topSkills = skills.slice(0, 3).join(', ');
  return `${yearsExp} professional with expertise in ${topSkills}. Proven track record of delivering high-quality results and driving innovation.`;
}
