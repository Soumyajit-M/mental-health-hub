const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/synopsis.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'synopsis.pdf',
    format: 'A4',
    margin: {
      top: '1in',
      bottom: '1in',
      left: '1.5in',
      right: '1in'
    },
    printBackground: true
  });
  await browser.close();
  console.log('PDF generated successfully!');
})();
