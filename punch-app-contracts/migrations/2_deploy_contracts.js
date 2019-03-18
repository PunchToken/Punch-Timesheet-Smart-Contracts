var PunchToken = artifacts.require("PunchToken");
var PunchDelegateTransfer = artifacts.require("PunchDelegateTransfer");
var punchTimeSheets = artifacts.require("PunchTimeSheets");


module.exports = function(deployer) {
 // You can delete these informations by running truffle networks --clean before truffle migrate.


 return deployer
        .then(() => {
            return deployer.deploy(PunchToken);            
        })
        .then((result) => {   
            console.log("Punch ERC20 Token Contract Address: " + result.address)                   
          return deployer.deploy(PunchDelegateTransfer);
        })
         .then((result) => {   
            console.log("Punch Delete Transfer Contract Address: " + result.address)                   
          return deployer.deploy(punchTimeSheets);
        }).then((result) => {
            console.log("Punch TimeSheet Contract Address" + result.address)
        })
};