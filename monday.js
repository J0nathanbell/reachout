// imports
const {getData} = require('./dataGetter2.js');

async function inputData() {
  let data = await getData();

  // const browser = await chromium.launch({
  //   headless: false
  // });
  // const context = await browser.newContext({
  //   storageState: 'storageState.json'
  // });
  // const page = await context.newPage();
  // await page.goto('https://umg.monday.com/boards/2132706384/views/64697777?finish_wizard=true');




  return data
}

inputData()





// create a cookie file for monday

// open monday with the correct cookies

// run the data getter function to bring the data to monday function

// create the logic for
