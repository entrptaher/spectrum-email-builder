var Styliner = require('styliner');
var styliner = new Styliner(__dirname + '/html', {
  // compact: true,
  "url": function (path, type) {
    if (path.startsWith('/')) {
      return "https://community.vanila.io" + path;
    }
    return path
  }
});

const fs = require('fs');

async function inliner(fileName) {
  // const fileName = "mentionInMessage.html";
  var originalSource = fs.readFileSync(__dirname + '/email-templates/' + fileName, 'utf8');
  const processedSource = await styliner.processHTML(originalSource)
  await fs.writeFileSync(__dirname + '/views/' + fileName, processedSource);
}

module.exports = inliner;