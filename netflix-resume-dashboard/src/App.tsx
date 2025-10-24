import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { NetflixResume } from './components/NetflixResume';
import { parseResume } from './utils/resumeParser';
import type { ResumeData } from './types';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const data = await parseResume(file);
      setResumeData(data);
    } catch (err) {
      console.error('Error parsing resume:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setResumeData(null);
    setError(null);
  };

  return (
    <div className="app">
      {!resumeData ? (
        <div className="upload-screen">
          <header className="app-header">
            <div className="netflix-logo-large">N</div>
            <h1 className="app-title">Netflix Resume Generator</h1>
            <p className="app-subtitle">Transform your resume into a Netflix-style showcase</p>
          </header>

          <main className="main-content">
            <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
          </main>

          <footer className="app-footer">
            <p>Supported formats: PDF, DOCX, TXT</p>
          </footer>
        </div>
      ) : (
        <NetflixResume data={resumeData} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
