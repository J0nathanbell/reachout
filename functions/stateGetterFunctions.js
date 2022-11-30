const playwright = require('@playwright/test');
const {mondayEmail, mondayPassword} = require('../logins.js');
const {trendpopEmail, trendpopPassword} = require('../logins.js');
const {tiktokEmail, tiktokPassword} = require('../logins.js');
const Fs = require ('fs')

async function stateGetterMonday() {
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
  await page.context().storageState({ path: 'storageStates/storageStateMonday.json' });
  await browser.close();
};

async function stateGetterTrendpop() {
  const browser = await playwright["chromium"].launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://app.trendpop.com/home')
  await page.locator('text=Email address').fill(trendpopEmail);
  await page.locator('css=[placeholder="Password"]').fill(trendpopPassword)
  await page.locator('css=[type="Submit"]').click();
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  await page.context().storageState({ path: 'storageStates/storageStateTrendpop.json' });
  await browser.close();
};

async function stateGetterTiktok() {
  const browser = await playwright["chromium"].launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.tiktok.com/@therock/')
  await page.waitForSelector("xpath=//*[@id='app']/div[2]/div[2]/div/div[1]/div[1]/div[2]/div/div/button");
  await page.context().storageState({ path: 'storageStates/storageStateTiktok.json' });
  await browser.close();
};

async function deturminIfFilesAreNeeded() {
  const path = './storageStates/storageStateMonday.json'
  if(Fs.existsSync(path)){
    const createdDate = Math.floor(Fs.statSync(path).ctimeMs)
    if(Date.now() > createdDate + 86401000){
      await stateGetterTrendpop()
      await stateGetterMonday()
    }else{
      return false
    }
  }else{
    await stateGetterTrendpop()
    await stateGetterMonday()
  }
}
exports.stateGetterTiktok = stateGetterTiktok
exports.stateGetterMonday = stateGetterMonday
exports.stateGetterTrendpop = stateGetterTrendpop
exports.deturminIfFilesAreNeeded = deturminIfFilesAreNeeded
