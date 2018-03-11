const puppeteer = require('puppeteer');
console.log('what the problem is');

(async () => {
  try {
  console.log('...? handled by try catch');
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });


  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto('http://localhost:8502');
  await page.waitFor(500);
  await page.type('.themoin-login input[type="email"]', 'taehoon.moon@themoin.com');
  await page.type('.themoin-login input[type="password"]', '123123');
  await page.click('.themoin-login input[type="submit"]');
  await page.waitFor(500);
  await page.screenshot({ path: './example.png', fullPage: true });
  await page.waitFor(2000);

  await browser.close();

  } catch (e) {
    console.log(e);
  }
})();
