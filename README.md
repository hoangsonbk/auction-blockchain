# Auction Blockchain
A simple (and working) Dapp for learning and testing purpose.
The source code is from [this article](https://medium.com/coinmonks/test-a-smart-contract-with-truffle-3eb8e1929370)

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

Run the test cases and make sure that the application is working. All test cases can be found in `/test` folder. Run the following command:
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

## Deploying to Testnet
Switch Metamask to `Ropsten Test Network` and go to [Rospten Faucet](https://faucet.metamask.io/) to get some ETH.

Go to [Infura](https://infura.io/), register a free account and get Infura `API_KEY`.

Add Ropsten Nework configuration to `truffle.js`
```JavaScript
const HDWalletProvider = require("truffle-hdwallet-provider");
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
Where

|Key|Value|
|----|----|
|MNENOMIC|Your Metamask passphrase when creating new Metamask account|
|INFURA_API_KEY|Your Infura account found in above step|


## Running with Metamask
Coming soon...