const path = require('path');
const fsaa = require('./fsaa.js');
const md = require("markdown-it")()
  .use(require("markdown-it-highlightjs"));

function markdownHtmlHead() {
  var headBegin = "<head>";
  var headEnd = "</head>"
  var head = headBegin + highlightjsClientTags() + headEnd;
  return head;
}

function highlightjsClientTags() {
  var retTags = `
        <link rel="stylesheet" href="/highlight/styles/default.css">
        <script src="/highlight/highlight.pack.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>`
  return retTags;
}
module.exports = function(baseDir) {
  return async function(req, res, next) {
    if (req.path.endsWith(".md")) {
      var filePath = path.join(baseDir, req.path);
      console.log("looking for file:", filePath);
      try {
        var data = await fsaa.readFile(filePath, 'utf8');
        var body = "<body>" + md.render(data) + "</body>";
        var head = markdownHtmlHead();
        var html = "<!doctype> \n<html>" + head + body + "</html>";
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(html);
      } catch (ex) {
        console.log(ex);
        if ("enoent" == ex.code) {
          next();
        } else {
          res.writeHead(503);
          res.end("oops");
        }
      }

    } else {
      next();
    };

  }
}