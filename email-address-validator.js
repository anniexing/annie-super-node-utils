function EmailAddressValidator(pattern){

	if(!pattern){
		//IDN is not supported.
		pattern =/^[a-zA-Z]+([a-zA-Z0-9]|\.|-|_)*@[a-zA-Z]+([a-zA-Z0-9]|-|_)*\.[a-zA-Z]+$/ig
	}
	this.validate=function(input){
		return pattern.test(input);
	}
}
module.exports=EmailAddressValidator;