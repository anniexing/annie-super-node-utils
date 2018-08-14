const util = require('util');
const fsaa = require('./fsaa.js');
const path = require('path');
const defaultMimeMap = require("./get-mime.js")();

module.exports = function(baseDir, options) {
    options = Object.assign({}, options);
    var includeMimeMap = Object.assign({}, defaultMimeMap, options.includeMimeMap);
    // excludeMimeMap is an array.
    var excludeMimeMap = [];
    if (options.excludeMimeMap) {
        excludeMimeMap = excludeMimeMap.concat(options.excludeMimeMap);
    }

    return async function(req, res, next) {

        console.log("try access " + req.path);
        var relPath = req.path;
        // always remove ending slash
        if (relPath.endsWith("/")) {
            relPath = relPath.substring(0, relPath.length - 1);
            console.log(`rewrite from ${req.path} to ${relPath}`);
        }

        // make an absolute path
        var absPath = path.join(baseDir, relPath);
        console.log(`expand to absolute file path ${absPath}`);
        try {
            var stat = await fsaa.stat(absPath);
            if (stat.isDirectory()) {
                absPath = absPath + "/index.html";
                stat = await fsaa.stat(absPath);
            }
            var extname = path.extname(absPath);
            var isMimeExcluded = excludeMimeMap.includes(extname);
            var mime = includeMimeMap[extname];
            if (!isMimeExcluded && mime) {
                var data = await fsaa.readFile(absPath);
                res.writeHead(200, { 'Content-Type': mime.contentType });
                res.end(data, mime.encoding);
            } else {
                console.log(`file extension ${extname} is not supported.`)
                next();
            }

        } catch (ex) {
            console.log(ex);
            if ("enoent" == ex.code) {
                next();
            } else {
                res.writeHead(503);
                res.end("oops!");
            }
        }
    }
}