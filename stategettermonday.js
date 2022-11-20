const playwright = require('@playwright/test');
const {mondayEmail, mondayPassword} = require('./logins.js');


async function StateGetterMonday() {
  const browser = await playwright["chromium"].launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://umg.monday.com/boards/2132706384/views/64697777?finish_wizard=true')
  await page.locator('text="I\'m a guest in this account"').click()
  await page.locator('css=[placeholder="Email"]').fill(mondayEmail)
  await page.locator('css=[placeholder="Password"]').fill(mondayPassword)
  await page.locator('xpath=//*[@id="login-monday-container"]/div/div[2]/div/div[1]/div/div[4]/div/button').click()
  await page.waitForSelector("//*[@id='board-header-view-bar']/div[1]/div[2]/div/div[1]/button");
  await page.context().storageState({ path: 'storageStateMonday.json' });
};
StateGetterMonday()
