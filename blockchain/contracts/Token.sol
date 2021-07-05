// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  uint initialSupply = 10000;
  constructor() ERC20("MyToken", "MT") public {
    _mint(msg.sender, initialSupply);
  }
}
