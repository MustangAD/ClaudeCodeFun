import React, { useRef } from 'react';
import type { ResumeData } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './NetflixResume.css';

interface NetflixResumeProps {
  data: ResumeData;
  onBack: () => void;
}

export const NetflixResume: React.FC<NetflixResumeProps> = ({ data, onBack }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: '#141414',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.name.replace(/\s+/g, '_')}_Netflix_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="netflix-resume-container">
      <div className="resume-controls">
        <button onClick={onBack} className="btn-secondary">
          Upload New Resume
        </button>
        <button onClick={handleExportPDF} className="btn-primary">
          Download as PDF
        </button>
      </div>

      <div className="resume-wrapper" ref={resumeRef}>
        <div className="netflix-resume">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="name-title">{data.name}</h1>
              <h2 className="job-title">{data.title}</h2>
              <p className="summary">{data.summary}</p>

              <div className="contact-info">
                {data.email && (
                  <span className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {data.email}
                  </span>
                )}
                {data.phone && (
                  <span className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {data.phone}
                  </span>
                )}
                {data.linkedin && (
                  <span className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    {data.linkedin}
                  </span>
                )}
                {data.github && (
                  <span className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {data.github}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div className="section skills-section">
              <h3 className="section-title">Top Skills</h3>
              <div className="skills-grid">
                {data.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div className="section experience-section">
              <h3 className="section-title">Experience</h3>
              <div className="experience-list">
                {data.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h4 className="position">{exp.position}</h4>
                        <p className="company">{exp.company}</p>
                      </div>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <ul className="description-list">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div className="section projects-section">
              <h3 className="section-title">Featured Projects</h3>
              <div className="projects-grid">
                {data.projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <h4 className="project-name">{project.name}</h4>
                    <p className="project-description">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div className="section education-section">
              <h3 className="section-title">Education</h3>
              <div className="education-list">
                {data.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <div>
                        <h4 className="degree">{edu.degree}</h4>
                        <p className="institution">{edu.institution}</p>
                      </div>
                      <span className="duration">{edu.duration}</span>
                    </div>
                    {edu.details && <p className="details">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Netflix Branding Footer */}
          <div className="netflix-footer">
            <div className="netflix-logo">N</div>
            <p className="footer-text">Netflix-Style Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
};
