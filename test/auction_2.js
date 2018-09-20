import "babel-polyfill";

const Auction = artifacts.require('./Auction.sol')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let instance;

contract('Auction', async (accounts) => {
  beforeEach(async () => {
    instance = await Auction.deployed();
  })

  it('deploys a contract', async () => {
    const auctionManager = await instance.manager();
    let manager = accounts[0]
    assert.equal(manager, auctionManager, 'The manager is the one who launched the smart contract.');
  });

  it('auctions the item', async () => {
    let seller = accounts[1];
    await instance.auction(2, { from: seller });
    let auctionSeller = await instance.seller();
    assert.equal(auctionSeller, seller, 'The seller is the one who called the auction method.');
    let auctionBid = await instance.latestBid();
    assert.equal(auctionBid, web3.utils.toWei('2', 'ether'), 'The latest bid is the argument sent to auction method converted into wei.');
  });

  it('bids the item', async () => {
    let bidder = accounts[2];
    await instance.bid({ from: bidder, value: web3.utils.toWei('3', 'ether') });
    let auctionBid = await instance.latestBid();
    assert.equal(auctionBid, web3.utils.toWei('3', 'ether'), 'The latest bid is the payment sent to bid method converted into wei.');
  });

  it('must bid above the latest bid amount', async () => {
    let bidder = accounts[2];
    try {
      await instance.bid({ from: bidder, value: web3.utils.toWei('1', 'ether') });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('only manager can finish the auction', async () => {
    let nonmanager = accounts[1];
    try {
      await instance.finishAuction({ from: nonmanager });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('finishes the auction as manager', async () => {
    let manager = accounts[0];
    await instance.finishAuction({ from: manager });
    assert(true);
  });
})
