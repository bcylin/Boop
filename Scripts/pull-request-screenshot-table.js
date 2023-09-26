/**
 {
   "api": 1,
   "name": "Pull Request Markdown Table",
   "description": "Put uploaded images into markdown tables.",
   "author": "bcylin",
   "icon": "table",
   "tags": "markdown,table"
 }
 **/


function main(state) {
  try {
    const urls = findImageURLs(state.text)
    state.text = buildMarkdownTable(urls)
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


function buildBeforeAfterTable(urls) {
  const titles = ["Before", "After"]
  var markdown = ""
  markdown += titles.join("|") + "\n"
  markdown += titles.map(() => "---").join("|") + "\n"
  markdown += urls.map(url => buildImageTag(url, 200)).join("|") + "\n"
  return markdown
}


function buildMarkdownTable(urls) {
  if (urls.length == 2) {
    return buildBeforeAfterTable(urls)
  }

  const firstRow = ["Normal", "Dark Mode", "RTL"]
  const secondRow = ["XXL", "Accessibility"]
  const titles = firstRow.concat(secondRow)

  const images = titles.reduce((result, title, index) => {
    result[title] = urls[index]
    return result
  }, {})

  var markdown = ""
  markdown += firstRow.join("|") + "\n"
  markdown += firstRow.map(column => "---").join("|") + "\n"
  markdown += firstRow.map(column => buildImageTag(images[column], 200)).join("|") + "\n"
  markdown += "\n"
  markdown += secondRow.join("|") + "\n"
  markdown += secondRow.map(column => "---").join("|") + "\n"
  markdown += secondRow.map(column => buildImageTag(images[column], 200)).join("|") + "\n"

  return markdown
}


function buildImageTag(url, width) {
  return `<img src="${url}" width="${width}" />`
}
