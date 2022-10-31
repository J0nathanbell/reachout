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
  const trendpopUrlArray = []
  const tiktokUrlList = await syncReadFile('./example.txt')
    for(const link of tiktokUrlList){
      trendpopUrlArray.push(tiktokUrlToTrendpopUrl(link))
  }
  return trendpopUrlArray
}

exports.linkExtractAndSanitise = linkExtractAndSanitise;
exports.syncReadFile = syncReadFile;
exports.tiktokUrlToTrendpopUrl = tiktokUrlToTrendpopUrl
exports.linkReducer = linkReducer
