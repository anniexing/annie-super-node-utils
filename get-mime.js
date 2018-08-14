var defaultMimeMap = {
    ".html": { "contentType": "text/html", "encoding": "utf8" },
    ".xml": { "contentType": "text/xml", "encoding": "utf8" },
    ".js": { "contentType": "application/javascript", "encoding": "utf8" },
    ".css": { "contentType": "text/css", "encoding": "utf8" },
    ".txt": { "contentType": "text/plain", "encoding": "utf8" },
    ".json": { "contentType": "application/json", "encoding": "utf8" },
    ".csv": { "contentType": "text/csv", "encoding": "utf8" },

    ".jpg": { "contentType": "image/jpg", "encoding": "binary" },
    ".jpeg": { "contentType": "image/jpg", "encoding": "binary" },
    ".png": { "contentType": "image/png", "encoding": "binary" },
    ".bmp": { "contentType": "image/bmp", "encoding": "binary" },
    ".gif": { "contentType": "image/gif", "encoding": "binary" },
    ".svg": { "contentType": "image/svg+xml", "encoding": "utf8" },
    ".ico": { "contentType": "image/x-icon", "encoding": "binary" },

    ".wav": { "contentType": "audio/wav", "encoding": "binary" },
    ".aac": { "contentType": "audio/aac", "encoding": "binary" },
    ".m4a": { "contentType": "audio/m4a", "encoding": "binary" },
    ".mp3": { "contentType": "audio/mp3", "encoding": "binary" },

    ".avi": { "contentType": "video/x-msvideo", "encoding": "binary" },
    ".mpeg": { "contentType": "video/mpeg", "encoding": "binary" },
    ".m4v": { "contentType": "video/mp4", "encoding": "binary" },

    ".ttf": { "contentType": "font/ttf", "encoding": "binary" },
    ".eot": { "contentType": "font/eot", "encoding": "binary" },
    ".otf": { "contentType": "font/otf", "encoding": "binary" },
    ".woff": { "contentType": "font/woff", "encoding": "binary" },
    ".woff2": { "contentType": "font/woff2", "encoding": "binary" },

    ".zip": { "contentType": "application/zip", "encoding": "binary" },
    ".bin": { "contentType": "application/octet-stream", "encoding": "binary" }
}

module.exports=function(){
	return Object.assign({},defaultMimeMap);
}