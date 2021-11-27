import Blockchain from "./blockchain.js";

const bitcoin = new Blockchain();

const previousBlockHash = "ADON3O48G539HG3FF3NEFU";

const currentBlockData = [
  {
    amount: 101,
    sender: "ADAKNDLN48T4NT8N43",
    recipient: "KNSDS8FHSF8S8FS",
  },
  {
    amount: 30,
    sender: "MCOEMVRE9VJJ3V3RJ",
    recipient: "MC9SUD8SDS7D9SH",
  },
  {
    amount: 200,
    sender: "SDMS877YFD7HF7DYF",
    recipient: "38392R8EF9DFNIF",
  },
];

// console.log(bitcoin.checkValid(previousBlockHash, currentBlockData));
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 335141));
