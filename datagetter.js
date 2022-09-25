const { chromium } = require('@playwright/test');

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
  await page.goto('https://app.trendpop.com/detail/creators/vt/videos/7117988108162944261');
  await page.locator('#root > div > div > div.Dashboard__AppContent-sc-1kdbayt-0.iTgJcQ > div.MuiPaper-root.Dashboard__Paper-sc-1kdbayt-1.Dashboard__InnerAppContent-sc-1kdbayt-2.gQPoTd.MuiPaper-elevation1.MuiPaper-rounded > div.MuiBox-root.jss21 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-7.MuiGrid-item.MuiGrid-grid-xs-12 > div:nth-child(1) > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-12.MuiGrid-grid-md-7.MuiGrid-grid-lg-9 > h4').waitFor();
  const views = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[1]/h4").innerText();
  const handle = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[3]/p/a").innerText();
  const tagsList = await page.locator("xpath=//*[@id='root']/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div/div[2]/div[2]/p").innerText();
  const tagsListText = tagsList.split(' ');
  return {views, handle, tagsListText};
};

(async function sanitisor(){
  let { views, handle, tagsListText } = await scraper();
  // console.log(views, handle, tagsListText)

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
  return console.log(views, handle, tags_array)
})()
