// imports
const { chromium } = require('@playwright/test');

async function inputData(data) {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    storageState: './storageStates/storageStateMonday.json'
  });
  const page = await context.newPage();
  await page.goto('https://umg.monday.com/boards/2132706384/views/64697777?finish_wizard=true');


  // loop start

  // click new aquisition = div data-walkthrough-id="add-item-with-dropdown"

  await page.locator('xpath=//*[@id="board-header-view-bar"]/div[1]/div[2]/div/div[1]/button').click()

  //*[@id="row-pulse---3597279347-notplaceholder-focus-name-"]/div/div[4]/div
  // const browser = await chromium.launch({
  //   headless: false
  // });
  // const context = await browser.newContext({
  //   storageState: 'storageState.json'
  // });
  // const page = await context.newPage();
  // await page.goto('https://umg.monday.com/boards/2132706384/views/64697777?finish_wizard=true');



  // return data
}

inputData()

exports.inputData = inputData;
