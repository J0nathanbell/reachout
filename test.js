// imports...
const { chromium } = require('@playwright/test');
const {linkExtractAndSanitise, tagsCreate, extractContacts} = require('./functions.js')

async function getData() {
  const mainLinkDataArray = []

  const listOfLinks = await linkExtractAndSanitise()
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    storageState: 'storageState.json'
  });
  const page = await context.newPage();
  await page.goto('https://app.trendpop.social');
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div > div.MuiBox-root.jss23 > div.MuiBox-root.jss24 > img').waitFor()

  for(const Urllink of listOfLinks){
    await page.goto(Urllink)
    await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div.MuiBox-root.jss21 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-7.MuiGrid-item.MuiGrid-grid-xs-12 > div:nth-child(1) > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-12.MuiGrid-grid-md-7.MuiGrid-grid-lg-9 > h4').waitFor();
    const bio = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/p").innerText();
    const subtitle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/h4").innerText();
    // let bioAndSubtitle = ''
    // let extractedContacts = ''
    // try{
    //   let bioAndSubtitle = `${bio} - ${subtitle}`
    //   // let extractedContacts = await extractContacts(bioAndSubtitle)
    // }
    // catch (err){
    //   console.log('got a bloody error aint we!')
    // }
    const data = {
      bioAndSubtitle: bioAndSubtitle,
      // extractedContacts: extractedContacts
    }
    mainLinkDataArray.push(data)
  }

  console.log(mainLinkDataArray)
  browser.close()
  return mainLinkDataArray
}
getData()
