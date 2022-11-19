const {readFileSync, promises: fsPromises} = require('fs')

// Turns tiktok.com/@taylorswift/video/7147533441326648618 into app.trendpop.com/detail/creators/handle/s/7147533441326648618
const tiktokUrlToTrendpopUrl = (url) => {
  const regex = /@[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  const rawArray = firstBit.split('/')
  const trendpopUrl = `https://app.trendpop.com/detail/creators/${rawArray[0].substring(1)}/${rawArray[1]}s/${rawArray[2]}`
  return trendpopUrl
}
// Cleans link e.g https://www.tiktok.com/@taylorswift/video/7147533441326648618
const linkReducer = (url) => {
  const regex = /h[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  return firstBit
}
// function to read text file
const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/).slice(0, -1);
  return arr;
}
async function linkExtractAndSanitise(){
  const tiktokAndTrendpopArray = []
  const tiktokUrlList = await syncReadFile('./example.txt')
    for(const link of tiktokUrlList){
      const data = {
        tiktokUrl: linkReducer(link),
        trendpopUrl:tiktokUrlToTrendpopUrl(link)
      }
      tiktokAndTrendpopArray.push(data)
  }
  return tiktokAndTrendpopArray
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
    console.log(number)
    return number
  }else{
    const number = parseFloat(figure) * 1000
    console.log(number)
    return number
  }
}

async function  extractContacts(bioAndSubtitle){
  // look in the bio and the sub title for:
  // emailaddresses
  const email = emailRegex.exec(bioAndSubtitle)
  const instaHandle = instaHandleRegex.exec(bioAndSubtitle)
}

async function tagExtract(bio){
  const regex = /\B(\#[a-zA-Z]+\b)(?!;)/g
  const tagsList = bio.match(regex)
  return tagsList
}

exports.tagExtract = tagExtract
exports.viewsToFigure = viewsToFigure
exports.extractContacts = extractContacts
exports.tagsCreate = tagsCreate;
exports.linkExtractAndSanitise = linkExtractAndSanitise;
exports.syncReadFile = syncReadFile;
exports.tiktokUrlToTrendpopUrl = tiktokUrlToTrendpopUrl
exports.linkReducer = linkReducer
