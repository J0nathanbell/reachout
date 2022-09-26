const playwright = require('@playwright/test');
const {email, password} = require('./logins.js');


async function trendpopStateGetter() {
  const browser = await playwright["chromium"].launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://app.trendpop.com/home')
  await page.locator('text=Email address').fill(email);
  await page.locator('css=[placeholder="Password"]').fill(password)
  await page.locator('css=[type="Submit"]').click();
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  await page.context().storageState({ path: 'storageState.json' });
};
trendpopStateGetter()
