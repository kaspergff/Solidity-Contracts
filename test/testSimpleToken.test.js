const SimpleToken = artifacts.require("SimpleToken")

var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("SimpleToken test", async accounts => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  it("Total supply should be 1000000000", async () => {
    const instance = await SimpleToken.deployed();
    let totalSupply = await instance.totalSupply();
    assert.equal(1000000000, totalSupply);
  })

  it("I can send tokens from Account 1 to Account 2", async () => {
    const sendTokens = 1;
    let instance = await SimpleToken.deployed();
    let totalSupply = await instance.totalSupply();
    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let instance = await SimpleToken.deployed();
    let balanceOfAccount = await instance.balanceOf(initialHolder);
    await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;

    //check if the balance is still the same
    await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);

  });



})