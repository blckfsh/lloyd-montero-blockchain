import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("Token", async function () {
  const { viem } = await network.connect();

  it("exposes the correct metadata", async function () {
    const token = await viem.deployContract("Token");

    assert.equal(await token.read.name(), "AR Data Intelligence");
    assert.equal(await token.read.symbol(), "ARD");
    assert.equal(await token.read.decimals(), 18);
  });

  it("allows anyone to mint and transfer", async function () {
    const token = await viem.deployContract("Token");
    const [owner, alice, bob] = await viem.getWalletClients();

    await token.write.mint([alice.account.address, 1_000n], {
      account: owner.account,
    });

    await token.write.mint([bob.account.address, 500n], {
      account: alice.account,
    });

    await token.write.transfer([bob.account.address, 250n], {
      account: alice.account,
    });

    assert.equal(await token.read.balanceOf([alice.account.address]), 750n);
    assert.equal(await token.read.balanceOf([bob.account.address]), 750n);
  });

  it("blocks transfers while paused", async function () {
    const token = await viem.deployContract("Token");
    const [owner, alice, bob] = await viem.getWalletClients();

    await token.write.mint([alice.account.address, 100n], {
      account: owner.account,
    });

    await token.write.pause({ account: owner.account });

    await assert.rejects(
      token.write.transfer([bob.account.address, 1n], {
        account: alice.account,
      }),
    );
  });
});
