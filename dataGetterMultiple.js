// imports...
const { chromium } = require('@playwright/test');
const {linkExtractAndSanitise, tagsCreate, extractContacts, viewsToFigure, tagExtract} = require('./functions.js')

async function getData() {
  // returns an array of all the urls
  const allUrlLinks = await linkExtractAndSanitise()
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

  for(const Urllink of allUrlLinks){
    await page.goto(Urllink.trendpopUrl);
    await page.locator('xpath=//*[@id="root"]/div/div/div[1]/div/div/div/ul/div/a[2]').waitFor();
    // wait for reports tab to be visible
    const trendpopCreatorPageLink = Urllink.trendpopUrl;
    const tiktokLink = Urllink.tiktokUrl;
    const views = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[1]/h4').innerText();
    const bio = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[2]/p').innerText();
    const handle = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[3]/p/a').innerText();

    // if the link is visible save it as bioLink

    // if(page.isVisible("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div[4]/span/a")){
    //   const bioLink = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div[4]/span/a").innerText();
    //   console.log(bioLink)
    // }
    // const extractedContacts = await extractContacts(bioAndSubtitle)

    const data = {
      views: await viewsToFigure(views),
      handle: handle,
      bio: bio,
      tags: await tagExtract(bio),
      tiktokLink: tiktokLink,
      trendpopCreatorPageLink: trendpopCreatorPageLink,
    }
    mainLinkDataArray.push(data)
  }
  browser.close()
  return mainLinkDataArray;
};

getData().then((data) => console.log(data));
exports.getData = getData;
