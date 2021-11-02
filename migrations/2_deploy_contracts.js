var HelloWorld = artifacts.require("HelloWorld")
var SimpleToken = artifacts.require("SimpleToken")

module.exports = function (deployer) {
  deployer.deploy(HelloWorld)
  deployer.deploy(SimpleToken, 1000000000)
}
