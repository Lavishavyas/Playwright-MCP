const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto("https://www.saucedemo.com");

  console.log("TITLE:", await page.title());
  console.log("URL:", page.url());

  await new Promise(resolve => setTimeout(resolve, 60000));

  await browser.close();
})();