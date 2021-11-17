class Blockchain {
  constructor() {
    this.chain = [];
    this.newTransactions = [];
    //? hold all of new transactions created before they are placed into a block
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timeStamp: Date.now(),
      transactions: this.newTransactions,
      //?all of the transactions in this block should be new transactions waiting to be placed into a block
      nonce: nonce,
      //? can be any number, basically a proof that we created this new block in a legitimate way using POW method
      hash: hash,
      //? this hash will be the data from our new block
      //? We will pass all our new transactions into hashing function [will be compressed into single string of code]
      previousBlockHash: previousBlockHash,
    };

    this.newTransactions = [];
    //?after new block created, we put all new transactions since last block was mined, into this new block
    //?so we want to clear this entire transactions array so that we can start over for the next block
    this.chain.push(newBlock);

    return newBlock;
  }
}

export default Blockchain;
