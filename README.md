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

```
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

## Deploying
Coming soon...

## Running with Metamask
Coming soon...