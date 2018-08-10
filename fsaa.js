const fs=require('fs');
const util=require('util');
module.exports={
    stat:util.promisify(fs.stat),
    readFile:util.promisify(fs.readFile),
    access:util.promisify(fs.access),
    exists:util.promisify(fs.exists)
};