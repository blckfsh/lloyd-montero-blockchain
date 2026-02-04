import { network } from "hardhat";

const { viem } = await network.connect();

const token = await viem.deployContract("Token");

console.log("Token deployed to:", token.address);

