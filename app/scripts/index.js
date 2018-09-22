// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import AuctionContract from '../../build/contracts/Auction.json'
const Auction = contract(AuctionContract)

let accounts
let account

const App = {
  start: function () {
    console.log('Start loading app...')
    Auction.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]
      console.log(accounts)
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  getCurrentBid: function () {
    this.setStatus('Getting current bid, please wait...')
    Auction.deployed().then(instance => {
      return instance.latestBid.call()
    }).then(bid => {
      const bidInEth = Web3.utils.fromWei(bid.toString(), 'ether');
      this.setStatus(`Current highest bid is: ${bidInEth} ETH`)
    }).catch(e => {
      this.setStatus(e)
    })
  },

  newAuction: function () {
    const amount = parseInt(document.getElementById('init').value)
    console.log('About to make an auction with ' + amount + ' eth...')
    this.setStatus('Register new auction...')
    Auction.deployed().then(instance => {
      return instance.auction(amount, { from: account })
    }).then(() => {
      this.setStatus('Register complete!')
    }).catch(e => {
      this.setStatus(e)
    })
  },

  newBid: function () {
    const amount = parseInt(document.getElementById('bid').value)
    console.log('About to make an bid with ' + amount + ' eth...')
    this.setStatus('Making a bid...')
    Auction.deployed().then(instance => {
      return instance.bid({
        from: account,
        value: Web3.utils.toWei(amount.toString(), 'ether')
      })
    }).then(() => {
      this.setStatus('Bid complete!')
    }).catch(e => {
      this.setStatus(e)
    })
  },

  finishAuction: function () {
    Auction.deployed().then(instance => {
      return instance.finishAuction({ from: account });
    }).then(() => {
      this.setStatus('Current Auction Finished!')
    }).catch(e => {
      this.setStatus(e)
    })
  }
}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
