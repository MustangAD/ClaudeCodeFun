# ClaudeCodeFun
Testing Various Ideas for EAPs

## Resume Duplicate Checker

A comprehensive HTML prototype for checking duplicate resumes with bulk upload, automatic categorization, and intelligent duplicate detection.

### Features

#### 📤 Bulk Upload
- Drag & drop interface for easy file uploads
- Support for multiple file formats (.pdf, .doc, .docx, .txt)
- File size display and individual file removal
- Visual feedback for file operations

#### 🔍 Duplicate Detection
- Intelligent similarity algorithm (70%+ threshold)
- Percentage-based similarity scoring
- Grouped duplicate display
- Visual indicators for duplicate resumes

#### 📊 Categorization
Automatic categorization by:
- **Departments**: Engineering, Marketing, Sales, HR, Finance, Operations, etc.
- **Roles**: Software Engineer, Manager, Analyst, etc.
- **Experience Levels**:
  - Entry Level (0-2 years)
  - Mid Level (3-5 years)
  - Senior Level (6-10 years)
  - Expert Level (10+ years)

#### 🎯 Smart Features
- **Resume Summaries**: Auto-generated summaries for each resume
- **Skills Extraction**: Identifies and displays key skills
- **Education Parsing**: Extracts education information
- **Real-time Statistics**: Dashboard with total, unique, and duplicate counts

#### 🔧 Filtering & Sorting
- Filter by department
- Filter by role
- Filter by experience level
- Filter by duplicate status (All/Unique/Duplicates)

#### 📑 Multiple View Modes
- **All Resumes**: Complete list with all filters
- **Duplicate Groups**: Organized view of duplicates with originals
- **By Department**: Grouped by department categories
- **By Role**: Organized by job roles
- **By Experience**: Sorted by experience levels

### How to Use

1. **Open the HTML file**
   ```bash
   # Simply open resume-duplicate-checker.html in any modern web browser
   open resume-duplicate-checker.html
   ```

2. **Upload Resumes**
   - Click "Choose Files" or drag and drop resume files
   - Upload multiple files at once

3. **Process Resumes**
   - Click "Process Resumes" button
   - Wait for analysis to complete

4. **Review Results**
   - View statistics dashboard
   - Use filters to narrow down results
   - Switch between different view tabs
   - Check duplicate groups and similarity scores
