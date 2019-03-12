const punchToken = artifacts.require("PunchToken");

contract("PunchToken", (accounts) => {
  it("should connect", async () => {
    const instance = await punchToken.deployed();
    console.log(instance.address);

  })
})


/*
var MetaCoin = artifacts.require("MetaCoin");

contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    return MetaCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  const MetaCoin = artifacts.require("MetaCoin");


  contract('2nd MetaCoin test', async (accounts) => {
  
    it("should put 10000 MetaCoin in the first account", async () => {
       let instance = await MetaCoin.deployed();
       let balance = await instance.getBalance.call(accounts[0]);
       assert.equal(balance.valueOf(), 10000);
    })
  
    it("should call a function that depends on a linked library", async () => {
      let meta = await MetaCoin.deployed();
      let outCoinBalance = await meta.getBalance.call(accounts[0]);
      let metaCoinBalance = outCoinBalance.toNumber();
      let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
      let metaCoinEthBalance = outCoinBalanceEth.toNumber();
      assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);
  
    });
*/