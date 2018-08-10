const pug = require('pug');
defaultOption = {
    cacheTemplateFunction: true
};
viewsCache = {};

function PugEngine(options) {
    options = Object.assign({}, defaultOption, options);
    console.log(options);
    this.getHtml = function(viewFileName, args) {
        if (!options.cacheTemplateFunction) {
            var fn = pug.compileFile(viewFileName, option);
            return fn(args);
        } else {
            if (!viewsCache[viewFileName]) {
                viewsCache[viewFileName] = pug.compileFile(viewFileName, options);
            }
            return viewsCache[viewFileName](args);
        }
    }
    this.writeHtml = function(res, viewFileName, args) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var html = this.getHtml(viewFileName, args);
        res.end(html);
    }
}
module.exports = PugEngine;