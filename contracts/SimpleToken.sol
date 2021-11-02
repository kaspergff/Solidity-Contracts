// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Simple ERC20 token made with openzepplin


contract SimpleToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Simple Token", "ST") public {
        _mint(msg.sender, initialSupply);
    }
}
