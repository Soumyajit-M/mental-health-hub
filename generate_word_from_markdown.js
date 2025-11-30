const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');

/**
 * Generate Word document (.docx) from markdown documentation
 * Converts all chapters into a properly formatted Word document
 */

const inputFile = path.join(__dirname, 'COMPLETE_DOCUMENTATION.md');
const outputFile = path.join(__dirname, 'Mental_Health_Hub_Documentation.docx');

console.log('📝 Generating Word Document from Markdown...\n');

async function generateWordDoc() {
    try {
        // Check if input file exists
        if (!fs.existsSync(inputFile)) {
            console.error('❌ Error: COMPLETE_DOCUMENTATION.md not found!');
            console.log('Run: node generate_complete_documentation.js first');
            process.exit(1);
        }

        console.log('📖 Reading markdown file...');
        const markdown = fs.readFileSync(inputFile, 'utf-8');

        console.log('🔄 Parsing markdown content...');
        const sections = [];
        const lines = markdown.split('\n');

        let currentParagraph = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines
            if (!line) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                continue;
            }

            // Heading 1
            if (line.startsWith('# ')) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    text: line.substring(2),
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 400, after: 200 }
                }));
            }
            // Heading 2
            else if (line.startsWith('## ')) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    text: line.substring(3),
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 150 }
                }));
            }
            // Heading 3
            else if (line.startsWith('### ')) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    text: line.substring(4),
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 240, after: 120 }
                }));
            }
            // Horizontal rule (page break)
            else if (line === '---') {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    text: '',
                    pageBreakBefore: true
                }));
            }
            // Bold text
            else if (line.startsWith('**') && line.endsWith('**')) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    children: [new TextRun({
                        text: line.substring(2, line.length - 2),
                        bold: true
                    })],
                    spacing: { after: 120 }
                }));
            }
            // Bullet point
            else if (line.startsWith('- ') || line.startsWith('* ')) {
                if (currentParagraph.length > 0) {
                    sections.push(new Paragraph({
                        children: [new TextRun(currentParagraph.join(' '))],
                        spacing: { after: 200 }
                    }));
                    currentParagraph = [];
                }
                sections.push(new Paragraph({
                    text: line.substring(2),
                    bullet: { level: 0 },
                    spacing: { after: 100 }
                }));
            }
            // Code block start/end
            else if (line.startsWith('```')) {
                // Skip code blocks for now (can be enhanced later)
                continue;
            }
            // Regular paragraph
            else {
                currentParagraph.push(line);
            }
        }

        // Add any remaining paragraph
        if (currentParagraph.length > 0) {
            sections.push(new Paragraph({
                children: [new TextRun(currentParagraph.join(' '))],
                spacing: { after: 200 }
            }));
        }

        console.log('📄 Creating Word document...');

        // Create the document
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1440,      // 1 inch = 1440 twips
                            right: 1440,    // 1 inch
                            bottom: 1440,   // 1 inch
                            left: 2160      // 1.5 inches
                        }
                    }
                },
                children: sections
            }]
        });

        console.log('💾 Saving Word document...');

        // Generate and save the document
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(outputFile, buffer);

        // Get file size
        const stats = fs.statSync(outputFile);
        const fileSizeInKB = (stats.size / 1024).toFixed(2);

        console.log('\n✅ Word document generated successfully!');
        console.log(`📄 Output file: ${outputFile}`);
        console.log(`📏 File size: ${fileSizeInKB} KB`);
        console.log(`\n🎉 Documentation Word file is ready!`);
        console.log('\nNote: For best formatting, open the file and apply:');
        console.log('  - Font: Times New Roman, 12pt');
        console.log('  - Line spacing: 1.5');
        console.log('  - Heading 1: 16pt, bold, centered');
        console.log('  - Heading 2: 14pt, bold');

    } catch (error) {
        console.error('\n❌ Error generating Word document:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run the Word document generation
generateWordDoc();
