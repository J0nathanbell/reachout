const {readFileSync, promises: fsPromises} = require('fs')
// Turns tiktok.com/@taylorswift/video/7147533441326648618 into app.trendpop.com/detail/creators/handle/s/7147533441326648618
const tiktokUrlToTrendpopUrl = (url) => {
  const regex = /@[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  const rawArray = firstBit.split('/')
  const trendpopUrl = `https://app.trendpop.com/detail/creators/${rawArray[0].substring(1)}/${rawArray[1]}s/${rawArray[2]}`
  return trendpopUrl
}
const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/).slice(0, -1);
  return arr;
}
// Cleans link e.g https://www.tiktok.com/@taylorswift/video/7147533441326648618
// function to read text file
async function linkExtractAndSanitise(){
  const tiktokAndTrendpopArray = []
  const tiktokUrlList = syncReadFile('./example.txt')
    for(const link of tiktokUrlList){
      const data = {
        tiktokVideoLink: linkReducer(link),
        tiktokCreatorLink: creatorPage(link),
        trendpopVideoLink: tiktokUrlToTrendpopUrl(link),
        trendpopCreatorLink: trendpopCreatorPage(tiktokUrlToTrendpopUrl(link)),
      }
      tiktokAndTrendpopArray.push(data)
  }
  return tiktokAndTrendpopArray
}

const trendpopCreatorPage = (url) => {
  const regex = /h[\s\S]*?\/videos/
  const firstBit = url.match(regex)[0].slice(0, -7);
  return firstBit
};

const linkReducer = (url) => {
  const regex = /h[\s\S]*?[?]/
  const firstBit = url.match(regex)[0].slice(0, -1);
  return firstBit
};
const creatorPage = (link) =>{
  const regex = /.+?(?=video)/
  const creatorPageLink = link.match(regex)
  return creatorPageLink[0]
}
async function tagsCreate(list){
    const tagsListText = await list.split(' ');
    let tag_array = []
    for( const tag of tagsListText){
      if(tag.startsWith('#')){
        tag_array.push(tag.slice(1))
      }
    }
  return tag_array
};
async function viewsToFigure(viewsString){
  const milorthou = viewsString.slice(-1)
  const figure = viewsString.slice(0, -1);
  if(milorthou == 'm'){
    const number = parseFloat(figure) * 1000000
    return viewsInStars(number)
  }else{
    const number = parseFloat(figure) * 1000
    return viewsInStars(number)
  }
}
async function viewsInStars(number){
  if(number <= 10000){
    return 1
  } else if(number >= 10000 && number <= 99999){
    return 2
  } else if(number >= 100000 && number <= 999999){
    return 3
  } else if(number >= 1000000 && number <= 9999999){
    return 4
  } else return 5
}
async function tagExtract(description){
  const regex = /\B(\#[a-zA-Z]+\b)(?!;)/g
  const tagsList = description.match(regex)
  return tagsList
}
async function instaHandles(bio){
  const regex = /\B(\@[a-zA-Z]+\b)(?!;)/g
  const handleList = bio.match(regex)
  return handleList
}
async function removeEmptyBio(bio){
  if(bio == 'No bio yet.'){
    return ''
  } else {
  return bio
  }
}
// try to see if there is a linktree link and click it
async function isLinktreeVisible(page){
  try {
    const linkTreeLink = await page.locator("xpath=//*[@id='app']/div[2]/div[2]/div/div[1]/div[2]/a").getAttribute('href')
    await page.goto(linkTreeLink);
    console.log('Linktree visible and clicked on');
    return true
  } catch(err) {
    console.error('Linktree link NOT visible')
    return false
  }
}
// try to click the open anyway link page
async function openAnywayPagePresent(page){
  try {
    const openAnyway = page.locator('xpath=//*[@id="button_"]').click();
    await openAnyway.click()
    await page.reload()
    console.log('clicked open anyway button')
    await cookieAcceptPagePresent()
  } catch(err){
    console.error('No open anyway button!')
  }
}
async function cookieAcceptPagePresent(page){
  try {
      const cookieAccept = page.locator('text="Accept"').click()
      await cookieAccept.click()
      await page.reload()
      await instagramLinkVisible()
  } catch(err){
    console.error('No cookie accept button')
  }
}
async function instagramLinkVisible(page){
  try{
    const instaLink = await(page.waitForSelector("a[aria-label~='instagram']")).getAttribute('href');
    console.log('Found instalink!');
    return instaLink
  } catch(err){
    console.error('couldn\'t find an insta link')
    return 'No link visible'
  }
}

exports.openAnywayPagePresent = openAnywayPagePresent
exports.tagExtract = tagExtract
exports.viewsToFigure = viewsToFigure
exports.tagsCreate = tagsCreate;
exports.linkExtractAndSanitise = linkExtractAndSanitise;
exports.syncReadFile = syncReadFile;
exports.tiktokUrlToTrendpopUrl = tiktokUrlToTrendpopUrl
exports.linkReducer = linkReducer
exports.removeEmptyBio = removeEmptyBio
exports.instaHandles = instaHandles
