function randInt(from,to){
	return Math.floor(Math.random()*(to-from)+from);
}
function toAlphaChar(val){
	if(val>=0&&val<10) return String.fromCharCode(48+val);
	if(val>=10&&val<36) return String.fromCharCode(65+val-10);
	if(val>=36&&val<62) return String.fromCharCode(97+val-36);
	throw "value must be less than 62.";
}
function randString(length){
	var  retText="";
	for(var i=0;i<length;i++){
		retText += toAlphaChar(randInt(0,62));
	}
	return retText;
}
module.exports = {
	randInt:randInt,
	randString:randString
}