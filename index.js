var MySqlUtils = require("./mysql-utils.js");
var PugEngine = require("./pug-engine.js");
module.exports={
  createMySql:function(options){
    return new MySqlUtils(options);
  },
  createPug:function(options){
    return new PugEngine(options);
  }
};
