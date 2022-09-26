const tiktokUrlToTrendpopUrl = (url) => {
  const regex = /@[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  const rawArray = firstBit.split('/')
  const trendpopUrl = `https://app.trendpop.com/detail/creators/${rawArray[0].substring(1)}/${rawArray[1]}s/${rawArray[2]}`
  return trendpopUrl
}

const linkReducer = (url) => {
  const regex = /h[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  return firstBit
}


exports.tiktokUrlToTrendpopUrl = tiktokUrlToTrendpopUrl
exports.linkReducer = linkReducer
