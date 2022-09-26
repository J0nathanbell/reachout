const { chromium } = require('@playwright/test');
const {extractEmails, emailRegex, extractInsta, instaRegex} = require('./regex.js');
const {tiktokUrlToTrendpopUrl} = require('./functions.js')
const {readFileSync, promises: fsPromises} = require('fs')

// function to read text file
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).slice(0, -1);

  return arr;
}
// reads text file saves it as tiktokurl
const tiktokUrl = syncReadFile('./example.txt')[0]
// change the url into a trendpop url
const trendpopUrl = tiktokUrlToTrendpopUrl(tiktokUrl)


async function scraper() {
  const browser = await chromium.launch({
    // headless: false
  });
  const context = await browser.newContext({
    storageState: 'storageState.json'
  });
  const page = await context.newPage();
  await page.goto('https://app.trendpop.social');
  // new unpaid bill section
  await page.locator('css=[type="radio"]').click();
  await page.locator('text=Go to dashboard').click();
  await page.locator('text=Add To Collection').waitFor();
  // load tiktok trendpop page

  const woahvicky = 'https://app.trendpop.com/detail/creators/woahvickyyyyyyyyyyyy/videos/7146639328847039790'
  const lottierodgers = 'https://app.trendpop.com/detail/creators/lottierogers/videos/7078349507825519878'

  await page.goto(trendpopUrl);
  await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div.MuiBox-root.jss21 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-7.MuiGrid-item.MuiGrid-grid-xs-12 > div:nth-child(1) > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-12.MuiGrid-grid-md-7.MuiGrid-grid-lg-9 > h4').waitFor();
  const link = tiktokUrl
  const views = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[1]/h4").innerText();
  const bio = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/p").innerText();
  const subtitle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/a/h4").innerText();
  const handle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[3]/p/a").innerText();
  const tagsList = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[2]/p").innerText();
  const tagsListText = tagsList.split(' ');

  return {views, handle, tagsListText, bio, subtitle};
};


(async function sanitisor(){
  let { views, handle, tagsListText, subtitle, bio } = await scraper();
  // creates an array of tags
  const tagsCreate = (list) => {
    let tag_array = []
    for( const tag of list){
      if(tag.startsWith('#')){
        tag_array.push(tag)
      }
    }
    return tag_array
  };
  const tags_array = tagsCreate(tagsListText)
  //
  const contacts = `${bio} - ${subtitle}`


  // look in the bio and the sub title for:
  // emailaddresses with a regex
  // let bio_email = emailRegex.exec(bio)
  // let subtitle_email = emailRegex.exec(subtitle)
  // insta instagram or IG I.G and whatever comes after it excluding an @ symbol instagram.com/czolgistadaniel
  // links click through click text open anyway then search dom for instagram.com/handle with regex excluding all but letters, periods, numbers, or underscores
  const data = {
    views: views,
    handle: handle,
    tags_array: tags_array,
    contacts: contacts
  }
  return console.log((data))

    // bioEmail,
    // subtitleEmail
    // bioInsta
    // subtitleInsta
    // clickableLink
})()

// exports.sanitisor = sanitisor;
