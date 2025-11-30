const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/diagrams.html', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.mermaid'); // Wait for Mermaid diagrams to render

  // Get all diagram containers
  const diagrams = await page.$$('.mermaid');

  for (let i = 0; i < diagrams.length; i++) {
    const diagram = diagrams[i];
    const boundingBox = await diagram.boundingBox();
    if (boundingBox) {
      await page.screenshot({
        path: `diagram_${i + 1}.png`,
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height,
        },
      });
    }
  }

  await browser.close();
  console.log('Diagrams PNGs generated successfully!');
})();
