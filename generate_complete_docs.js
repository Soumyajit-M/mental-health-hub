const fs = require('fs');
const path = require('path');

/**
 * Generate Complete Project Documentation in Markdown
 * This script compiles all documentation chapters into a single comprehensive file
 * 
 * Format: A4 size, Times New Roman, 12pt text, 14pt headings, 16pt chapters
 * Margins: 1" top/bottom/right, 1.5" left
 * Line spacing: 1.5 lines
 * Page numbers: Bottom center
 */

const chapters = [
  {
    title: 'ACKNOWLEDGEMENT',
    file: 'docs/ACKNOWLEDGEMENT.md',
    pageNumber: 'i'
  },
  {
    title: 'DECLARATION',
    file: 'docs/DECLARATION.md',
    pageNumber: 'ii'
  },
  {
    title: 'CERTIFICATE',
    file: 'docs/CERTIFICATE.md',
    pageNumber: 'iii'
  },
  {
    title: 'CHAPTER 1: INTRODUCTION',
    file: 'docs/CHAPTER_1_INTRODUCTION.md',
    pageNumber: 1
  },
  {
    title: 'CHAPTER 2: OBJECTIVE',
    file: 'docs/CHAPTER_2_OBJECTIVE.md',
    pageNumber: 5
  },
  {
    title: 'CHAPTER 3: SYSTEM ANALYSIS',
    sections: [
      { title: '3.1 Identification of Need', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.1.md' },
      { title: '3.2 Preliminary Investigation', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.2.md' },
      { title: '3.3 Feasibility Study', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.3.md' },
      { title: '3.4 Project Planning', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.4.md' },
      { title: '3.5 Project Scheduling', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.5.md' },
      { title: '3.6 Software Requirement Specification', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.6.md' },
      { title: '3.7 System Specification', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.7.md' },
      { title: '3.8 Data Models', file: 'docs/CHAPTER_3_SYSTEM_ANALYSIS_3.8.md' }
    ],
    pageNumber: 7
  },
  {
    title: 'CHAPTER 4: SYSTEM DESIGN',
    file: 'docs/CHAPTER_4_SYSTEM_DESIGN.md',
    pageNumber: 43
  },
  {
    title: 'CHAPTER 5: TESTING',
    file: 'docs/CHAPTER_5_TESTING.md',
    pageNumber: 51
  },
  {
    title: 'CHAPTER 6: SYSTEM SECURITY MEASURES',
    file: 'docs/CHAPTER_6_SECURITY.md',
    pageNumber: 58
  },
  {
    title: 'CHAPTER 7: COST ESTIMATION',
    file: 'docs/CHAPTER_7_COST_ESTIMATION.md',
    pageNumber: 62
  },
  {
    title: 'CHAPTER 8: REPORT',
    file: 'docs/CHAPTER_8_REPORT.md',
    pageNumber: 65
  },
  {
    title: 'CHAPTER 9: FUTURE SCOPE',
    file: 'docs/CHAPTER_9_FUTURE_SCOPE.md',
    pageNumber: 68
  },
  {
    title: 'CHAPTER 10: APPENDICES',
    file: 'docs/CHAPTER_10_APPENDICES.md',
    pageNumber: 70
  }
];

function generateCompleteDocumentation() {
  let documentation = `# MENTAL HEALTH HUB
## Complete Project Documentation

**Project Title:** Mental Health Hub - A Real-Time Mental Health Support Platform with AI-Powered Assistance

**Student Name:** Soumyajit M  
**Email:** jitroymondal@gmail.com  
**GitHub Repository:** https://github.com/Soumyajit-M/mental-health-hub  
**Project Version:** 2.2.0  
**Date:** November 30, 2025

---

## FORMATTING SPECIFICATIONS

This document follows the prescribed academic formatting guidelines:

- **Paper Size:** A4 (210mm × 297mm)
- **Font Family:** Times New Roman
- **Font Sizes:**
  - Body Text: 12pt
  - Section Headings: 14pt
  - Chapter Titles: 16pt
- **Margins:**
  - Top: 1 inch (2.54 cm)
  - Bottom: 1 inch (2.54 cm)
  - Left: 1.5 inches (3.81 cm)
  - Right: 1 inch (2.54 cm)
- **Line Spacing:** 1.5 lines
- **Page Numbers:** Bottom center
- **Figures:** Numbered with captions (e.g., Figure 3.1: Use Case Diagram)
- **Tables:** Numbered with captions (e.g., Table 5.1: Test Case Results)

---

## TABLE OF CONTENTS

`;

  // Generate table of contents
  let pageNum = 1;
  chapters.forEach(chapter => {
    if (chapter.sections) {
      documentation += `\n### ${chapter.title.toUpperCase()} ........................... Page ${chapter.pageNumber}\n`;
      chapter.sections.forEach(section => {
        documentation += `   ${section.title} ........................... Page ${pageNum}\n`;
        pageNum += 3;
      });
    } else {
      const pageLabel = typeof chapter.pageNumber === 'number' ? `Page ${chapter.pageNumber}` : `Page ${chapter.pageNumber}`;
      documentation += `\n### ${chapter.title.toUpperCase()} ........................... ${pageLabel}\n`;
    }
  });

  documentation += `\n\n---\n\n<div class="page-break"></div>\n\n`;

  // Compile all chapters
  chapters.forEach(chapter => {
    if (chapter.sections) {
      documentation += `\n\n<div class="page-break"></div>\n\n# ${chapter.title}\n\n`;
      chapter.sections.forEach(section => {
        const filePath = path.join(__dirname, section.file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          documentation += `\n\n${content}\n\n<div class="page-break"></div>\n\n`;
        } else {
          documentation += `\n\n## ${section.title}\n\n*Content to be added*\n\n<div class="page-break"></div>\n\n`;
        }
      });
    } else {
      const filePath = path.join(__dirname, chapter.file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        documentation += `\n\n<div class="page-break"></div>\n\n${content}\n\n`;
      } else {
        documentation += `\n\n<div class="page-break"></div>\n\n# ${chapter.title}\n\n*Content to be added*\n\n`;
      }
    }
  });

  // Add footer
  documentation += `\n\n---\n\n## END OF DOCUMENT\n\n**Total Pages:** Approximately 75 pages\n\n**Document Generated:** ${new Date().toLocaleString()}\n\n**Repository:** https://github.com/Soumyajit-M/mental-health-hub\n\n---\n\n*This documentation is prepared in accordance with academic project report guidelines.*\n`;

  // Write to file
  const outputPath = path.join(__dirname, 'COMPLETE_PROJECT_DOCUMENTATION.md');
  fs.writeFileSync(outputPath, documentation, 'utf8');

  console.log('✓ Complete documentation generated successfully!');
  console.log(`✓ Output file: ${outputPath}`);
  console.log(`✓ Total size: ${Math.round(documentation.length / 1024)} KB`);
  console.log('\nNext steps:');
  console.log('1. Open COMPLETE_PROJECT_DOCUMENTATION.md');
  console.log('2. Convert to Word using: node generate_docx.js');
  console.log('3. Or convert to PDF using: node generate_pdf.js');
}

// Run generation
if (require.main === module) {
  try {
    generateCompleteDocumentation();
  } catch (error) {
    console.error('Error generating documentation:', error);
    process.exit(1);
  }
}

module.exports = { generateCompleteDocumentation };
