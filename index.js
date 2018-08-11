var MySqlUtils = require("./mysql-utils.js");
var PugEngine = require("./pug-engine.js");
var rand = require("./rand.js");
var hash = require("./hash.js");
var staticFile = require("./static-file.js");
var markdown = require("./markdown.js");
var httpCode = require("./httpCode.js")
var EmailAddressValidator = require("./email-address-validator.js");

module.exports={
  createMySql:function(options){
    return new MySqlUtils(options);
  },
  createPug:function(options){
    return new PugEngine(options);
  },
  createEmailAddressValidator:function(pattern){
  	return new EmailAddressValidator(pattern);
  },
  rand:rand,
  hash:hash,
  httpCode:httpCode,
  staticFile:staticFile,
  markdown:markdown
};
