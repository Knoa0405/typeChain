"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
// Class 의 constructor 사용 시 interface 사용 안해도 된다.
// interface Block {
//     index: number;
//     hash: string;
//     previousHash: string;
//     data: string;
//     timestamp: number;
// }
class Block {
    // 생성자 함수로 클래스 new 로 할당시 바로 호출되는 함수 ( 초기화 함수? )
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// static 사용 시 Block 의 인스턴스 생성 후 변수 할당하여 하지 않고 바로 사용 가능하다.
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
// genesisBlock 이 class Block 이여야 한다.
const genesisBlock = new Block(0, "2309423", "", "Hello", 123456);
// blockchain 이 class Block 의 array 형태여야 한다.
let blockchain = [genesisBlock];
// 함수 표현식으로 정의된 getBlockChain 의 경우, Block[] Block array 형태를 리턴한다.
const getBlockChain = () => blockchain;
// 마찬가지지만, Block 형태로 리턴한다.
const getLatestBlock = () => blockchain[blockchain.length - 1];
// timeStamp 의 경우, Math.round(new Date().getTime() / 1000); => 숫자 형태로 리턴한다.
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
// createNewBlock => data: string 으로 파라미터를 받아서 => Block 형태로 리턴한다.
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock(); //최근 저장된 블록을 가져온다.
    const newIndex = previousBlock.index + 1; //블록의 인덱스에 + 1 을 newIndex 에 저장한다.
    const newTimeStamp = getNewTimeStamp(); //TimeStamp number 값으로 저장한다.
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data); //calculateBlockHash => Crypto SHA256으로 String 생성 후 newHash 에 저장 한다.
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp); //새 블록을 만든다. ( 새로운 파라미터 정보를 넘겨준다. )
    addBlock(newBlock);
    return newBlock; // 새 블록을 리턴한다.
};
const getHashForBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");
console.log(blockchain);
//# sourceMappingURL=index.js.map