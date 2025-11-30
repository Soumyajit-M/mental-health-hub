const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

/**
 * Generate PDF from the combined markdown documentation
 * Uses Puppeteer to convert HTML to PDF with proper formatting
 */

const inputFile = path.join(__dirname, 'COMPLETE_DOCUMENTATION.md');
const outputFile = path.join(__dirname, 'Mental_Health_Hub_Documentation.pdf');

console.log('📄 Generating PDF from Markdown...\n');

async function generatePDF() {
    try {
        // Check if input file exists
        if (!fs.existsSync(inputFile)) {
            console.error('❌ Error: COMPLETE_DOCUMENTATION.md not found!');
            console.log('Run: node generate_complete_documentation.js first');
            process.exit(1);
        }

        // Read markdown content
        console.log('📖 Reading markdown file...');
        const markdown = fs.readFileSync(inputFile, 'utf-8');

        // Convert markdown to HTML
        console.log('🔄 Converting markdown to HTML...');
        const htmlContent = marked.parse(markdown);

        // Create complete HTML with styling
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mental Health Hub - Documentation</title>
    <style>
        @page {
            size: A4;
            margin: 2.54cm 2.54cm 2.54cm 3.81cm; /* Top, Right, Bottom, Left */
        }
        
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            max-width: 100%;
            margin: 0;
            padding: 20px;
        }
        
        h1 {
            font-size: 16pt;
            font-weight: bold;
            margin-top: 24pt;
            margin-bottom: 12pt;
            page-break-after: avoid;
            text-align: center;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 18pt;
            margin-bottom: 10pt;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 14pt;
            margin-bottom: 8pt;
            page-break-after: avoid;
        }
        
        h4, h5, h6 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 12pt;
            margin-bottom: 6pt;
        }
        
        p {
            margin: 6pt 0;
            text-align: justify;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 12pt 0;
            page-break-inside: avoid;
        }
        
        table, th, td {
            border: 1px solid #000;
        }
        
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            padding: 8pt;
            text-align: left;
        }
        
        td {
            padding: 6pt;
        }
        
        pre {
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10pt;
            overflow-x: auto;
            page-break-inside: avoid;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
            line-height: 1.4;
        }
        
        code {
            font-family: 'Courier New', monospace;
            font-size: 10pt;
            background-color: #f5f5f5;
            padding: 2pt 4pt;
            border-radius: 3px;
        }
        
        pre code {
            background-color: transparent;
            padding: 0;
        }
        
        ul, ol {
            margin: 6pt 0;
            padding-left: 30pt;
        }
        
        li {
            margin: 3pt 0;
        }
        
        blockquote {
            border-left: 4px solid #ccc;
            margin: 12pt 0;
            padding-left: 12pt;
            color: #666;
            font-style: italic;
        }
        
        hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 24pt 0;
        }
        
        a {
            color: #0066cc;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        /* Table of contents styling */
        .toc {
            page-break-after: always;
        }
        
        .toc h2 {
            text-align: center;
            margin-bottom: 20pt;
        }
        
        .toc ul {
            list-style-type: none;
            padding-left: 0;
        }
        
        .toc li {
            margin: 8pt 0;
        }
        
        /* Figure and table captions */
        .figure-caption, .table-caption {
            text-align: center;
            font-style: italic;
            margin: 6pt 0;
            font-size: 11pt;
        }
        
        /* Page numbers */
        @page {
            @bottom-center {
                content: counter(page);
            }
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>
        `;

        // Save HTML file for debugging
        const htmlFile = path.join(__dirname, 'documentation_temp.html');
        fs.writeFileSync(htmlFile, html, 'utf-8');
        console.log('📝 HTML file created for conversion');

        // Launch puppeteer and generate PDF
        console.log('🚀 Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        
        console.log('📄 Loading content...');
        await page.setContent(html, { waitUntil: 'networkidle0' });

        console.log('🖨️  Generating PDF...');
        await page.pdf({
            path: outputFile,
            format: 'A4',
            margin: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1.5in'
            },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div></div>',
            footerTemplate: `
                <div style="font-size: 10pt; text-align: center; width: 100%; font-family: 'Times New Roman';">
                    <span class="pageNumber"></span> / <span class="totalPages"></span>
                </div>
            `
        });

        await browser.close();

        // Clean up temp HTML file
        fs.unlinkSync(htmlFile);

        // Get file size
        const stats = fs.statSync(outputFile);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log('\n✅ PDF generated successfully!');
        console.log(`📄 Output file: ${outputFile}`);
        console.log(`📏 File size: ${fileSizeInMB} MB`);
        console.log(`\n🎉 Documentation PDF is ready for submission!`);

    } catch (error) {
        console.error('\n❌ Error generating PDF:', error.message);
        process.exit(1);
    }
}

// Run the PDF generation
generatePDF();
