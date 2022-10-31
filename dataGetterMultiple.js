// imports...
const { chromium } = require('@playwright/test');
const {linkExtractAndSanitise} = require('./functions.js')

async function getData() {
  // returns an array of all the urls
  const listOfLinks = await linkExtractAndSanitise()
  // This is the returned array of all the data
  const mainLinkDataArray = []
  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext({
    storageState: 'storageState.json'
  });
  const page = await context.newPage();
  await page.goto('https://app.trendpop.social');
  // new unpaid bill section
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  // await page.locator('text=Add To Collection').waitFor();
  await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div > div.MuiBox-root.jss23 > div.MuiBox-root.jss24 > img').waitFor()

  for(const Urllink of listOfLinks){
    await page.goto(Urllink);
    await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div.MuiBox-root.jss21 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-7.MuiGrid-item.MuiGrid-grid-xs-12 > div:nth-child(1) > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-12.MuiGrid-grid-md-7.MuiGrid-grid-lg-9 > h4').waitFor();
    const link = Urllink
    const views = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[1]/h4").innerText();
    const bio = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/p").innerText();
    const subtitle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/h4").innerText();
    const handle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[3]/p/a").innerText();
    const tagsList = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[2]/p").innerText();
    const tagsListText = await tagsList.split(' ');
    const tagsCreate = (list) => {
      let tag_array = []
      for( const tag of list){
        if(tag.startsWith('#')){
          tag_array.push(tag)
        }
      }
      return tag_array
    };
    const tags_array = await tagsCreate(tagsListText)
    const contacts = `${bio} - ${subtitle}`
    const data = {
      views: views,
      handle: handle,
      tags_array: tags_array,
      contacts: contacts,
      link: link
    }
    mainLinkDataArray.push(data)
  }
  browser.close()
  return mainLinkDataArray;
};

getData().then((data) => console.log(data));
exports.getData = getData;
