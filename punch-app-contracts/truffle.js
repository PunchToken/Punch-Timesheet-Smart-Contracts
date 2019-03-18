require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
var HDWalletProvider = require("truffle-hdwallet-provider");
var PkWalletProvider = require('truffle-hdwallet-provider-privkey');
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")


const ropstenPK =['']
const ropstenProviderPk = new PkWalletProvider(ropstenPK,'' )

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: ropstenProviderPk,
      gas: 4600000,     
      network_id: 3     
    },
    mainnet: {
      gas:4712388,     
      gasPrice:15000000000,     
      network_id:1,
      provider: function () {
            const mneomicPK  = [''];
            const mainnetProvider = new PkWalletProvider(mneomicPK, '');
            var nonceTracker = new NonceTrackerSubprovider()
            mainnetProvider.engine._providers.unshift(nonceTracker)
            nonceTracker.setEngine(mainnetProvider.engine)
            return mainnetProvider
          }
    }
  },
  rpc: {
    host: 'localhost',
    post:8080
  },
  compilers:{
    solc:{
      version:"0.4.23"
    }
  }
};