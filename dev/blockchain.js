import crypto from "crypto";

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    //* hold all of new transactions created before they are placed into a block
    //* on our blockchain, there going to be a lot of people who make different transactions
    //* these transactions are not recorded into our blockchain yet
    //* they get recored when a new block is created/mined
    //* hence all of these transactions are pending and not validated yet
    this.createNewBlock(100, "0", "0");
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timeStamp: Date.now(),
      transactions: this.pendingTransactions,
      //*all of the transactions in this block should be pending transactions waiting to be placed into a block
      nonce: nonce,
      //* can be any number, basically a proof that we created this new block in a legitimate way using POW method
      hash: hash,
      //* this hash will be the data from our new block
      //* We will pass all our new transactions into hashing function [will be compressed into single string of code]
      previousBlockHash: previousBlockHash,
    };

    this.pendingTransactions = [];
    //* after new block created, we put all new transactions since last block was mined, into this new block
    //* so we want to clear this entire transactions array so that we can start over for the next block
    this.chain.push(newBlock);

    return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
    };
    //* all transactions in our blockchain will look like this
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()["index"] + 1;
    //* what block we will be able to find this new transaction in
    //* will be in the block mined/created next
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = crypto.createHash("sha256").update(dataAsString).digest("hex");
    return hash;
    //* take a block from our blockchain and hash that block into some fixed length string
    //* with any given input, the output hash will alwways be the same for that particular input
    //* currentBlockData is an array containing objects that represent transactions for current block
  }

  checkValid(previousBlockHash, currentBlockData) {
    //* repeatedly hash block until it finds correct hash starting with four zeros '0000AISDPD...'
    //* continuously change nonce value until it finds correct hash
    //* returns to us the nonce value that creates correct hash
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce = nonce + 1;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }
}

export default Blockchain;
