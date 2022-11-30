// imports...
const { chromium } = require('@playwright/test');
const {linkExtractAndSanitise,openAnywayPagePresent, tagsCreate, removeEmptyDescription, instaHandles, extractContacts, viewsToFigure, tagExtract} = require('./functions/functions.js')

async function getData() {
  // returns an array of all the urls
  const allUrlLinks = await linkExtractAndSanitise()
  // This is the returned array of all the data
  const mainLinkDataArray = []
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext({
    storageState: 'storageStates/storageStateTrendpop.json',
  });
  const page = await context.newPage({
    colorScheme: 'dark'

  });
  await page.goto('https://app.trendpop.social');
  // new unpaid bill section
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  // await page.locator('text=Add To Collection').waitFor();
  await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div > div.MuiBox-root.jss23 > div.MuiBox-root.jss24 > img').waitFor()

  for(const Urllink of allUrlLinks){
    await page.goto(Urllink.trendpopVideoLink);
    await page.locator('xpath=//*[@id="root"]/div/div/div[1]/div/div/div/ul/div/a[2]').waitFor();
    // wait for reports tab to be visible
    const views = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[1]/h4').innerText();
    const description = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[2]/p').innerText();
    const handle = await page.locator('xpath=//*[@id="video-report"]/div/div[1]/div[1]/div/div/div/div[2]/div[3]/p/a').innerText();
    const trendpopVideoLink = Urllink.trendpopVideoLink;
    const trendpopCreatorLink = Urllink.trendpopCreatorLink;
    const tiktokVideoLink = Urllink.tiktokVideoLink;
    const tiktokCreatorLink = Urllink.tiktokCreatorLink;


    // this is the link tree bit
    // await page.goto(trendpopCreatorLink)
    // await page.reload()

    // const linktreePage = page.locator('xpath=//*[@id="root"]/div/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div[4]/span/a').click();
    // // await page.goto(linktreePage)
    // const instaLink = await page.locator("a[aria-label~='instagram']").getAttribute('href');




    const data = {
      views: await viewsToFigure(views),
      handle: handle,
      description: description,
      tags: await tagExtract(description),
      links:{
        tiktokCreatorLink: tiktokCreatorLink,
        tiktokVideoLink: tiktokVideoLink,
        // go to the tiktok page and search for a link
        trendpopVideoLink: trendpopVideoLink,
        trendpopCreatorLink: trendpopCreatorLink
      },
      contacts:{
        // linkTree: instaLink,
        instaHandles: await instaHandles(description),
        // sameInstaAsTikTok: sameInstaAsTikTok,
        // email:email
      },
    }
    mainLinkDataArray.push(data)
  }
  browser.close()
  return mainLinkDataArray;
};

exports.getData = getData;
