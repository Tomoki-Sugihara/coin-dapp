// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20 {
  constructor() ERC20("MyToken", "MT") public {
    _mint(msg.sender, 10000000);
  }

  // function initialToken(address toAddress)
  //   public
  //   returns (bool successs)
  // {
  //   // _mint(msg.sender, 1000);
  //   transfer(toAddress, 100);
  //   return true;
  // }
}
