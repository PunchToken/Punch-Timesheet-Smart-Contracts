pragma solidity ^0.4.23;

import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract PunchUpgradeableProxy is Ownable {  
    address private _currentImplementation; 

    event ProxyOwnershipTransferred(address previousOwner, address newOwner);

    constructor() public Ownable() {        
    }

    function updateImplementation(address _newImplementation) onlyOwner public {
        require(_newImplementation != address(0));
        emit ProxyOwnershipTransferred(_currentImplementation, _newImplementation);
        _currentImplementation = _newImplementation;
    }

    function implementation() public view returns(address) {
        return _currentImplementation;
    }

    function() payable public {
        address _impl = implementation();
        require(_impl != address(0));

        assembly {
            // Copy the data sent to the memory address starting 0x40
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)

            // Proxy the call to the contract address with the provided gas and data
            let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)

            // Copy the data returned by the proxied call to memory
            let size := returndatasize
            returndatacopy(ptr, 0, size)

            // Check what the result is, return and revert
            switch result
            case 0 { revert(ptr, size)}
            default { return(ptr, size)}            
        }
    }
}