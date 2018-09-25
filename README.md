# Auction Blockchain
A simple (and working) Smart Contract and Dapp for learning and testing purpose.
The source code is inspired by [this article](https://medium.com/coinmonks/test-a-smart-contract-with-truffle-3eb8e1929370)

## Getting Started
Install [Truffle](https://truffleframework.com/)
```
npm install -g truffle
```

Install [Ganache](https://truffleframework.com/ganache)
```
You can download the GUI app from provided link above.
```

## Running test cases
Start Ganache. A simple blockchain will be created with 10 accounts funded with 100 ETH each. All other information of the chain (like Network ID, Host address, Port...) can also be found from the GUI.

Run the test cases and make sure that the application is working. All test cases can be found in `/test` folder. Run the following command to start the test:
```
truffle test
```

## Configuration
Truffle configuration can be found in `truffle.js` file.

```JavaScript
module.exports = {
  networks: {
    development: {
      network_id: '*',
      host: '127.0.0.1',
      port: 7545,
    },
  }
}
```

Note that `host` and `port` should match with the ones showing in Ganache.

## Connecting to Metamask
Coming soon...

## Running web application
Coming soon...

## Deploying to Testnet
Switch Metamask to `Ropsten Test Network` and go to [Rospten Faucet](https://faucet.metamask.io/) to get some ETH.

You can use Infura to deploy smart contracts to mainnet as well as test nets without requiring you to have a synced node running locally. Go to [Infura](https://infura.io/), register a free account and get Infura `INFURA_API_KEY`.

Add Ropsten Nework configuration to `truffle.js`
```JavaScript
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

const MNENOMIC = process.env.MNENOMIC;
const INFURA_URL = `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`;

module.exports = {
  networks: {
    development: {
      network_id: '*',
      host: '127.0.0.1',
      port: 9545,
    },
    private: {
      network_id: '*',
      host: '127.0.0.1',
      port: 8545,
    },
    ropsten: {
      provider: () => new HDWalletProvider( MNENOMIC, INFURA_URL),
      network_id: 3,
      gas: 470000,
      gasPrice: 21
    },
  }
}
```
Remember to create `.env` file in the root folder and put these global variables:

|Key|Value|
|----|----|
|MNENOMIC|Your Metamask passphrase when creating new Metamask account|
|INFURA_API_KEY|Your Infura account found in above step|

After that, simply run this command to deploy the smart contract to Rospten test net.
```
truffle migrate --network ropsten
```

If the migration is successful, we can expect the output like below:
```
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x49eef85ec914490097cf8010eed38c5bc769f514c4647d1ff99d8abcd62fbfab
  Migrations: 0x7c17ca9368529de63fb995e78b1694f36d0ca799
Saving successful migration to network...
  ... 0x0e0b29c119ee7d0d9088576a22a17209a505cf80823c5e1170c14d03ef113255
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Auction...
  ... 0x5f203414363eeaf37848284d693a932ca0376bdb4ed2197be46d46988df4c4d4
  Auction: 0x09171da6d7b2490c8a530d76d08f9e56635d982f
Saving successful migration to network...
  ... 0x6793f62dfc126a9aebadea2508167a25a7555c54eebdb43d8911402d569ba019
Saving artifacts...
```

Then you know your smart contract has been successfully deployed to the network at address: `0x09171da6d7b2490c8a530d76d08f9e56635d982f`
