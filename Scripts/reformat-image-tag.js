/**
 {
   "api": 1,
   "name": "Reformat image URLs into <img> tags",
   "description": "Extract image URLs and put them into <img> tags",
   "author": "bcylin",
   "icon": "table",
   "tags": "img,tag"
 }
 **/


function main(state) {
  try {
    const urls = findImageURLs(state.text)
    state.text = reformat(urls)
  }
  catch (error) {
    state.fullText += `\n${error.message}\n`
  }
}


function findImageURLs(text) {
  const pattern = new RegExp(/https[^"\n)]+/ig)
  var matches = []

  while (null != (match = pattern.exec(text))) {
    matches.push(match[0])
  }
  return matches
}


function reformat(urls) {
  const width = 200
  return urls.map(url => buildImageTag(url, width)).join("\n")
}


function buildImageTag(url, width) {
  return `<img src="${url}" width="${width}" />`
}
