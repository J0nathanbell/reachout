const { chromium } = require('@playwright/test');

// trying to click through to the linktree tiktok link to then xtract the
// insta url from the next page


async function extractContacts(){
  const link = 'https://www.tiktok.com/@therock?lang=en'
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  // got to main tiktok page
  await page.goto(link);
  // save the linktree link as a variable
  const linkTree = await page.locator("xpath=//*[@id='app']/div[2]/div[2]/div/div[1]/div[2]/a").getAttribute('href')
  // go the the linktree link
  await page.goto(linkTree);
  // click the button as soon as visible
  const openAnyway = page.locator('xpath=//*[@id="button_"]')
  await openAnyway.click();
  try {
    await page.reload()
    console.log('Trying to find link');
    const instaLink = await page.waitForSelector("a[aria-label~='instagram']".href);
    const linkyGuy = instaLink.innerHTML()
    console.log(linkyGuy);
    console.log(instaLink);

} catch (err) {
    console.error('couldnt find it');
}

  // browser.close()
  return
}
extractContacts()
// .then((instaLink) => console.log(instaLink));
