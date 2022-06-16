var dotenv = require('dotenv');
var fs = require('fs');

module.exports = function () {
  let module = {};

  module.overwriteEnv = function (envFileName) {
    const envConfig = dotenv.parse(fs.readFileSync(envFileName))
    for (let k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }

  return module;
}();
