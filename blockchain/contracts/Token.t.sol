// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test} from "forge-std/Test.sol";

import {Token} from "./Token.sol";

contract TokenTest is Test {
    Token private token;

    address private owner = address(this);
    address private alice = address(0xA11CE);
    address private bob = address(0xB0B);

    function setUp() public {
        token = new Token();
    }

    function testMetadata() public {
        assertEq(token.name(), "AR Data Intelligence");
        assertEq(token.symbol(), "ARD");
        assertEq(token.decimals(), 18);
    }

    function testOwnerIsDeployer() public {
        assertEq(token.owner(), owner);
    }

    function testMintFromOwner() public {
        token.mint(alice, 1_000 ether);

        assertEq(token.totalSupply(), 1_000 ether);
        assertEq(token.balanceOf(alice), 1_000 ether);
    }

    function testMintFromNonOwner() public {
        vm.prank(alice);
        token.mint(bob, 250 ether);

        assertEq(token.totalSupply(), 250 ether);
        assertEq(token.balanceOf(bob), 250 ether);
    }

    function testPauseOnlyOwner() public {
        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSignature(
                "OwnableUnauthorizedAccount(address)",
                alice
            )
        );
        token.pause();
    }

    function testUnpauseOnlyOwner() public {
        token.pause();

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSignature(
                "OwnableUnauthorizedAccount(address)",
                alice
            )
        );
        token.unpause();
    }

    function testPauseBlocksTransfers() public {
        token.mint(alice, 100 ether);
        token.pause();

        vm.prank(alice);
        vm.expectRevert();
        token.transfer(bob, 1 ether);
    }

    function testUnpauseAllowsTransfers() public {
        token.mint(alice, 100 ether);
        token.pause();
        token.unpause();

        vm.prank(alice);
        token.transfer(bob, 1 ether);

        assertEq(token.balanceOf(bob), 1 ether);
        assertEq(token.balanceOf(alice), 99 ether);
    }

    function testBurnReducesSupply() public {
        token.mint(alice, 50 ether);

        vm.prank(alice);
        token.burn(10 ether);

        assertEq(token.totalSupply(), 40 ether);
        assertEq(token.balanceOf(alice), 40 ether);
    }
}
