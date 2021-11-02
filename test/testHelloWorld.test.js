const HelloWorld = artifacts.require("HelloWorld")

contract("HelloWorld test", async accounts => {
  it("string helloWorld should be Hello World!", async () => {
    const instance = await HelloWorld.deployed();
    const string = await instance.helloWorld.call()
    assert.equal(string, "Hello World!");
  })
})