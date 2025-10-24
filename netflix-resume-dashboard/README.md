# Netflix Resume Generator

Transform your traditional resume into a stunning Netflix-style showcase! This web application allows you to upload your resume in various formats (PDF, DOCX, TXT) and automatically generates a beautiful, Netflix-themed resume that you can download and share.

## Features

- **File Upload**: Drag-and-drop or click to upload your resume in PDF, DOCX, or TXT format
- **Smart Parsing**: Automatically extracts key information from your resume including:
  - Contact information (name, email, phone, LinkedIn, GitHub)
  - Professional summary
  - Work experience
  - Education
  - Skills
  - Projects
- **Netflix-Themed Design**: Gorgeous, modern design inspired by Netflix's visual language
- **PDF Export**: Download your Netflix-style resume as a PDF
- **Responsive**: Works perfectly on desktop and mobile devices

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **PDF.js** - PDF parsing and rendering
- **Mammoth** - DOCX file parsing
- **react-dropzone** - Drag-and-drop file upload
- **html2canvas** - Convert HTML to image
- **jsPDF** - Generate PDF files

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd netflix-resume-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Upload Your Resume**: Click or drag-and-drop your resume file (PDF, DOCX, or TXT) into the upload area
2. **Wait for Processing**: The application will parse your resume and extract relevant information
3. **View Your Netflix Resume**: Your resume will be displayed in a beautiful Netflix-style format
4. **Download**: Click "Download as PDF" to save your Netflix-style resume
5. **Upload Another**: Click "Upload New Resume" to start over with a different file

## Project Structure

```
netflix-resume-dashboard/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx         # File upload component
│   │   ├── FileUpload.css
│   │   ├── NetflixResume.tsx      # Netflix-style resume display
│   │   └── NetflixResume.css
│   ├── utils/
│   │   └── resumeParser.ts        # Resume parsing logic
│   ├── App.tsx                    # Main application component
│   ├── App.css
│   ├── types.ts                   # TypeScript type definitions
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Application entry point
├── public/                        # Static assets
├── index.html                     # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization

### Styling

The Netflix theme uses the following color scheme:
- Primary Red: `#e50914` (Netflix red)
- Background: `#141414` (Dark black)
- Text: `#ffffff` (White)

You can customize colors in the CSS files:
- `src/index.css` - Global styles
- `src/App.css` - App component styles
- `src/components/NetflixResume.css` - Resume display styles
- `src/components/FileUpload.css` - Upload component styles

### Resume Parser

The resume parser in `src/utils/resumeParser.ts` uses pattern matching to extract information. You can enhance it by:
- Adding more sophisticated parsing logic
- Supporting additional file formats
- Improving text extraction accuracy
- Adding AI/ML-based parsing (e.g., using OpenAI API)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Known Limitations

- Resume parsing is based on pattern matching and may not be 100% accurate
- Complex resume layouts may not parse perfectly
- Large PDF files may take longer to process

## Future Enhancements

- [ ] AI-powered resume parsing for better accuracy
- [ ] Multiple resume themes (not just Netflix)
- [ ] Edit parsed data before generating the resume
- [ ] Share resume via unique URL
- [ ] Additional export formats (PNG, SVG)
- [ ] Resume templates gallery

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Netflix for design inspiration
- PDF.js team for the excellent PDF parsing library
- React and Vite communities

---

Made with ❤️ using React and TypeScript
