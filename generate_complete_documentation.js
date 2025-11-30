const fs = require('fs');
const path = require('path');

/**
 * Generate complete documentation by combining all markdown files
 * This creates a single markdown file that can be converted to Word/PDF
 */

const docsDir = path.join(__dirname, 'docs');
const outputFile = path.join(__dirname, 'COMPLETE_DOCUMENTATION.md');

// Define the order of files to combine
const fileOrder = [
    'ACKNOWLEDGEMENT.md',
    'DECLARATION.md',
    'CERTIFICATE.md',
    'CHAPTER_1_INTRODUCTION.md',
    'CHAPTER_2_OBJECTIVE.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.1.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.2.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.3.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.4.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.5.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.6.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.7.md',
    'CHAPTER_3_SYSTEM_ANALYSIS_3.8.md',
    'CHAPTER_4_SYSTEM_DESIGN.md',
    'CHAPTER_5_TESTING.md',
    'CHAPTER_6_SECURITY.md',
    'CHAPTER_7_COST_ESTIMATION.md',
    'CHAPTER_8_PROJECT_REPORT.md',
    'CHAPTER_9_FUTURE_SCOPE.md',
    'CHAPTER_10_APPENDICES.md'
];

console.log('📚 Generating Complete Documentation...\n');

let completeContent = '';
let pageBreak = '\n\n---\n\n<div style="page-break-after: always;"></div>\n\n---\n\n';

// Add title page
completeContent += `# MENTAL HEALTH HUB

## Anonymous Mental Health Support Platform

### Academic Project Documentation

---

**Project Title:** Mental Health Hub - AI-Powered Mental Health Support Platform

**Student Name:** Soumyajit M

**Email:** jitroymondal@gmail.com

**GitHub Repository:** https://github.com/Soumyajit-M/mental-health-hub

**Project Version:** 2.2.0

**Academic Year:** 2025-2026

**Date:** November 30, 2025

---

**Department:** [Your Department]

**Institution:** [Your Institution]

**Course:** [Your Course]

---

**Supervisor:** [Supervisor Name]

**Examiner:** [Examiner Name]

---

${pageBreak}
`;

let filesProcessed = 0;
let totalFiles = fileOrder.length;

// Combine all files in order
fileOrder.forEach((filename, index) => {
    const filePath = path.join(docsDir, filename);
    
    if (fs.existsSync(filePath)) {
        console.log(`✅ Processing ${index + 1}/${totalFiles}: ${filename}`);
        
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Add the content
        completeContent += content;
        
        // Add page break after each chapter (except the last one)
        if (index < fileOrder.length - 1) {
            completeContent += pageBreak;
        }
        
        filesProcessed++;
    } else {
        console.log(`⚠️  File not found: ${filename}`);
    }
});

// Write the combined file
fs.writeFileSync(outputFile, completeContent, 'utf-8');

console.log(`\n✅ Complete documentation generated successfully!`);
console.log(`📄 Output file: ${outputFile}`);
console.log(`📊 Files combined: ${filesProcessed}/${totalFiles}`);
console.log(`📏 Total size: ${(completeContent.length / 1024).toFixed(2)} KB`);
console.log(`\nNext steps:`);
console.log(`1. Install required packages: npm install marked puppeteer officegen`);
console.log(`2. Generate PDF: node generate_pdf_from_markdown.js`);
console.log(`3. Generate Word: node generate_word_from_markdown.js`);
