var crypto = require('crypto');
function computeMD5(input){
	return crypto.createHash("md5").update(input).digest("hex");
}
module.exports={
	computeMD5:computeMD5
}