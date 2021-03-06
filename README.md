# Cross chain Lit Protocol signature verification on Celo with a NFT mirroring example

![](https://dtr.limaois.me/039be8ee-6b2b-40ca-889e-eeae7148c550.png)
This project is a work for https://gitcoin.co/issue/lit-protocol/cross-chain-lit-protocol-signature-verification/1/100027187

For demo, visit https://flyinglimao.github.io/lit-protocol-on-celo

## Use Guide

If you would like to use this in your Celo contract, you can import with following code. (Note that it's not production-ready.)

```solidity=
import 'https://github.com/flyinglimao/lit-protocol-on-celo/contracts/ILitVerify.sol';

// ...
    ILitVerify litVerify = ILitVerify(0x7d08aF9a703f897c6cAE78B21aE1C634750ccc59);
    require(litVerify(header, payload, signature), "JWT invalid");
// ...
```

To verfiy a JWT, pass the raw header, raw payload (i.e. in JSON and not encoded), and a handled signature to the function `verify(string, string, bytes)`. The function will return a boolean. The signature has to be formatted with the structure used in Celo, you may need some library and write some formatter to do so.

You can use the `PointG2.fromSignature` provided by [@noble/bls12-381](https://www.npmjs.com/package/@noble/bls12-381) to handle the signature. Here is how I use it:

1. Turn the uint8array singature into hex
2. Get the Point `signaturePoing = PointG2.fromSignature(hexString)`
3. Turn it into hex `signaturePoint.toHex()`
4. Split it into 4 strings, each contains 96 chars
5. Pad the start of the strings with a 32 length 0 string
6. Concat them
   The result string is

## Reference

- Solidity JWT by OpenZeppelin - https://github.com/OpenZeppelin/solidity-jwt : The idea of parsing JWT come from this
  - https://github.com/adriamb/SolRsaVerify/
  - https://github.com/chrisdotn/jsmnSol
  - https://github.com/Arachnid/solidity-stringutils/
- Noble BLS12-381 by paulmilr - https://github.com/paulmillr/noble-bls12-381 : The method to compute come from this
- LitJsSdk : https://github.com/LIT-Protocol/lit-js-sdk
- Celo CIP-0031 : https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0031.md
- BigModExp : https://docs.klaytn.com/smart-contract/precompiled-contracts

## Architecture

- The core contract is LitVerify.sol which depends on Base64.sol, JsmnSolLib.sol, Strings.sol
  - In this contract, it considers the Lit Network Public Key as a constant and precomputed negate of the public key
  - Most functions inside were referred to the mentioned repo, Noble BLS12-381, and rewritten into Solidity with pre-compiles
  - Some arguments of some contract were turned into constant in favor of saving gas
- The example contract is MirrorNFT.sol
  - It provides a function `claim` that user can pass processed JWT and mint a NFT with the same token URI as Ethereum
  - Although there are many checks inside the contract, improper inputs may still be reverted somewhere in addition to the checks
  - Transfer is not allowed in the contract, but user can transfer on Ethereum and re-claim

## Demo

- Web App: https://flyinglimao.github.io/lit-protocol-on-celo
- NFT Contract: [0xcc9C556FbF52e7F1ca8e0E3eB7311ea21d893512](https://alfajores-blockscout.celo-testnet.org/address/0xcc9C556FbF52e7F1ca8e0E3eB7311ea21d893512/)

* In this demo, you can input a ERC721 contract address and a token id (you don't have to own it). It will mint a NFT on Celo that mirrored from Ethereum.

## Idea about passing data

As I was developing contract, there is a obvious problem that I need to parse hex string to bytes,
because the data in JSON is stored in string. To more efficiently use the data, protobuf might be
a considerable choice, which is also commonly used and won't make it limit to ethereum. (While
RLP is more easily to decode in solidity.) Besides, the first part (header) is useless in most
condition, deleteing it might be simple and powerful (thus we can skip decoding and concating).
