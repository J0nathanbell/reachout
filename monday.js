// imports
// const {getData} = require('./dataGetter2.js');
const { chromium } = require('@playwright/test');
const {linkExtractAndSanitise, tagsCreate, removeEmptyDescription, instaHandles, extractContacts, viewsToFigure, tagExtract} = require('./functions.js')

async function inputData() {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    storageState: 'storageStateMonday.json'
  });
  const page = await context.newPage();
  await page.goto('https://umg.monday.com/boards/2132706384/views/64697777?finish_wizard=true');


  // let data = await getData();

  // Create a storagestate file
  // open the browser
  // go to monday my view specifically (work out specific filters dates etc)
  // click new aquisition = div data-walkthrough-id="add-item-with-dropdown"
  // loop over the data entries one by one inputting the correct data into the correct places



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





// create a cookie file for monday

// open monday with the correct cookies

// run the data getter function to bring the data to monday function

// create the logic for
