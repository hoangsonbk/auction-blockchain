// Allows us to use ES6 in our migrations and tests.
require('babel-register')
require('dotenv').config()

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
