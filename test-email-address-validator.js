var EmailAddressValidator = require("./email-address-validator.js");
var validator = new EmailAddressValidator();
var validEmailAddress = "lxzhu@outlook.com";
var invalidEmailAddress ="5@6.com"
function validate(email){
	console.log(email, "is", validator.validate(email) ? "valid" : "invalid");
}
validate(validEmailAddress);
validate(invalidEmailAddress);
