module.exports = {

    e404 = function(req, res, next) {
        res.writeHead(404);
        res.end("welcome to the blackhole.");
    }
}