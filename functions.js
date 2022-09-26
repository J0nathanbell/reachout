const tiktokUrlToTrendpopUrl = (url) => {
  const regex = /@[\s\S]*?[?]/
  const firstBit = (url.match(regex)[0].slice(0, -1))
  const rawArray = firstBit.split('/')
  const trendpopUrl = `https://app.trendpop.com/detail/creators/${rawArray[0].substring(1)}/${rawArray[1]}s/${rawArray[2]}`
  return trendpopUrl
}
// console.log(tiktokUrlToTrendpopUrl('https://www.tiktok.com/@jesusnalgas/video/7133744128545918251?is_from_webapp=v1&item_id=7133744128545918251'))

exports.tiktokUrlToTrendpopUrl = tiktokUrlToTrendpopUrl
