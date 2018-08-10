const util = require('util');
const fsaa=require('./fsaa.js');
const path=require('path');



var mimeMap = {
    ".html": { "contentType": "text/html", "encoding": "utf8" },    
    ".js": { "contentType": "text/javascript", "encoding": "utf8" },
    ".css": { "contentType": "text/css", "encoding": "utf8" },
    ".json": { "contentType": "text/json", "encoding": "utf8" },
    ".jpg": { "contentType": "image/jpg", "encoding": "binary" },
    ".png": { "contentType": "image/png", "encoding": "binary" },
    ".bmp": { "contentType": "image/bmp", "encoding": "binary" },
    ".gif": { "contentType": "image/gif", "encoding": "binary" },
}

module.exports = function(baseDir,options) {
    return async function(req, res,next) {

        console.log("try access "+req.path);
        var relPath = req.path;
        // always remove ending slash
        if(relPath.endsWith("/"))
        {
            relPath=relPath.substring(0,relPath.length-1);
            console.log(`rewrite from ${req.path} to ${relPath}`);
        }

        // make an absolute path
        var absPath = path.join(baseDir, relPath);
        console.log(`expand to absolute file path ${absPath}`);
        try{
            var stat = await fsaa.stat(absPath);
            if(stat.isDirectory()){
                absPath=absPath+"/index.html";
                stat = await fsaa.stat(absPath);                
            }
            var extname = path.extname(absPath);
            var mime=mimeMap[extname];
            if(mime){
                var data=await fsaa.readFile(absPath);
                res.writeHead(200, { 'Content-Type': mime.contentType });
                res.end(data, mime.encoding);
            }else{
                console.log(`file extension ${extname} is not supported.`)
                next();
            }

        }catch(ex){
            console.log(ex);             
            if("enoent"==ex.code){
                next();
            }else{
                res.writeHead(503);
                res.end("oops!");
            }          
        }
    }
}