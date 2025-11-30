const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/user_guide.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'user_guide.pdf',
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
  console.log('User Guide PDF generated successfully!');
})();
