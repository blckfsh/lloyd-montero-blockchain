# Sample Hardhat 3 Beta Project (`node:test` and `viem`)

This project showcases a Hardhat 3 Beta project using the native Node.js test runner (`node:test`) and the `viem` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using [`node:test`](nodejs.org/api/test.html), the new Node.js native test runner, and [`viem`](https://viem.sh/).
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

### Deploy to Base Sepolia

This project includes an Ignition module to deploy the `Token` contract. The Hardhat config exposes a `baseSepolia` network that reads `RPC_URL` and `PRIVATE_KEY`.

Set the config variables (either via environment variables or `hardhat-keystore`):

```shell
pnpm hardhat keystore set BASE_SEPOLIA_RPC_URL
pnpm hardhat keystore set BASE_SEPOLIA_PRIVATE_KEY
pnpm hardhat keystore set ETHERSCAN_API_KEY
```

Deploy the contract:

```shell
pnpm hardhat ignition deploy ignition/modules/Token.ts --network baseSepolia
```

Deploy and verify in one step:

```shell
pnpm hardhat ignition deploy ignition/modules/Token.ts --network baseSepolia --verify
```

### Base Sepolia Sample Deployment

Sample Token Contract deployed in Base Sepolia Testnet: https://sepolia.basescan.org/address/0x0005e7B62b2ED1B9b5B9a7D844307A057920Ed96

Users able to mint token: https://sepolia.basescan.org/tx/0x17b3d2bda350dd19725072e774806752ff8f2bfe1824caa50baca14e48523a57

Users able to transfer token to another address: https://sepolia.basescan.org/tx/0x925606cab6d7ea49571518a186c4f82b7c773d6816d073f91d14a2da488b7135
