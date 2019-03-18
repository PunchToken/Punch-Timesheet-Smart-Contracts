pragma solidity ^0.4.23;


import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";
import "../../node_modules/zeppelin-solidity/contracts/AddressUtils.sol";

/**
 * @title Punch TimeSheet
 * @dev Saving encrypted submitted timesheets to addresses.
 */
contract PunchTimeSheets is Ownable {
    // Import safeMath for operations.
    using SafeMath for uint256;
    using AddressUtils for address;
      
    // the mapping of whitelisted Client Addresses.
    mapping(address => bool) private _clientAddressWhiteList;   

    // the mapping of at least two parties to an array of submitted timeSheets.        
    mapping(address => mapping(address => string))  private _submittedTimeSheets; 

    // Emit Event for Persisting timeSheet.
    event TimeSheetSubmitted(address participantAddress1, address participantAddress2, string _encryptedTimeSheet); 

    /**
    * @dev Empty Constructor, for now.
    */
    constructor() public {
       
    }

    /**
    * @dev Query if an address is whitelisted.
    * @param _address address The address requested to see if it whitelisted
    * @return a true or false if it is whitelisted.    
    */
    function isWhiteListed(address _address) public view returns (bool success) {
        require(_address != address(0), "Client Address is a zero address, not allowed.");
        require(_address.isContract() == false, "Client Address is a contract address, not allowed");
        return _clientAddressWhiteList[_address];
    }

    /**
    * @dev Only Owner can Whitelist a Client to Interact with TimeSheet 
    * @dev Contract. Default is Public. External, cannot be called internally, 
    * @dev can be called from other contract.
    * @param _clientAddress address The address of the client to add.
    * @return A bool representing if the operation was successful or not.
    */
    function whiteListClient(address _clientAddress) external onlyOwner returns (bool success){
        require(_clientAddress != address(0), "Client Address is a zero address, not allowed.");
        require(_clientAddress.isContract() == false, "Client Address is a contract address, not allowed");
        _clientAddressWhiteList[_clientAddress] = true;
        return true;
    }

    /**
    @dev Only owner can remove client address. You cannot delete mapping.
    @param _clientAddress address. The address to remove.
    @return a bool representing if the address was successfully removed.
    */
    function deWhiteListClient(address _clientAddress) external onlyOwner returns (bool success) {
        require(_clientAddress != address(0), "Client Address is a zero address, not allowed.");
        require(_clientAddress.isContract() == false, "Client Address is a contract address, not allowed");
        _clientAddressWhiteList[_clientAddress] = false;
        return true;
    }

    /**   
    @dev This take an approved timeSheet and add to the blockchain.
    @dev It is added to a cache of address to struct containing
    @dev a submitted timesheet which includes the encrypted data
    @dev the address of the two participants
    @dev and if the timesheet is still valid.
    @dev Use string for arbitrary-length string (UTF-8) data that's longer than 32 bytes.
    @param _participant1 address The first participant
    @param _participant2 address The second participant
    @param _encryptedTimeSheet string. The Encrypted Submitted Timesheet.    
    */
    function addTimeSheet(address _participant1, address _participant2, string _encryptedTimeSheet) external 
        onlyOwner {
        require(_participant1 != address(0), "First participant is a zero address, not allowed.");
        require(_participant1.isContract() == false,"First participant is a contract address, not allowed");
        require(_clientAddressWhiteList[_participant1] == true, "First participant is not whitelisted");
        require(_participant2 != address(0), "Second participant is a zero address, not allowed" );
        require(_participant2.isContract() == false, "Second participant is a contract address, not allowed");
        require(_clientAddressWhiteList[_participant2] == true,"Second participant is not whitelisted");
        require(_participant1 != _participant2, "First participant has the same address as Second participant, not allowed"); //not sent to self
        bytes memory tempEmptyStringTest = bytes(_encryptedTimeSheet);
        require(tempEmptyStringTest.length != 0, "Encrypted timesheet is an emptying string, not allowed"); //non empty string        
        emit TimeSheetSubmitted(_participant1, _participant2, _encryptedTimeSheet);        
    }   
}