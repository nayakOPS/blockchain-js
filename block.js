const hexToBinary = require("hex-to-binary");
const { GENESIS_data, MINE_RATE } = require ("./genesisBlockConfig.js");
const { cryptoHash } = require("./crypto-hash.js");

class Block{
    /* Constructor function for creating a new block object.
    Parameters:
    - data: Data stored in the block.
    - timestamp: Timestamp of when the block was created.
    - prevHash: Hash of the previous block in the blockchain.
    - hash: Hash of the current block.
    - nonce: Nonce value used in mining.
    - difficulty: Difficulty level for mining the block. */
    // param as object to avoid In Order argument acceptance
    constructor({data, timestamp, prevHash, hash, nonce, difficulty}){
        this.data=data;
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.nonce=nonce;
        this.difficulty=difficulty;
    };

    /* Static method to create the genesis block of the blockchain.
    Returns a new Block object with genesis data. */
    // static belongs to a class rather than instances, not called when the class object instance is made
    static genesis(){
        return new this(GENESIS_data);
    };

    /* Static method to mine a new block.
    Parameters:
    - prevBlock: Previous block in the blockchain.
    - data: Data to be stored in the new block.
    Returns a new Block object after mining. */
    static mineBlock({ prevBlock,data }){
        // const timestamp = Date.now();
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        let { difficulty } = prevBlock;

        // Mining process: Continuously calculate hash until it satisfies the difficulty criteria.
        let nonce=0;
        do{
            // increase the nonce value to reach the target
            nonce++;
            timestamp=Date.now();
            difficulty = Block.adjustDifficulty({originalBlock:prevBlock,timestamp});
            // until the loop ends the timestamp and hashing process keeps going on
            hash=cryptoHash(timestamp, prevHash, nonce, difficulty, data);

            // let assume hash = abcdef , the first n char of hash must be 0's
            // the final target hash should be 00cdef if the difficulty becomes 2
            // so substring will be (0,2) 2=(difficulty)

            /* so, in this random process of generating the hash value our difficulty is determined by adjustDifficulty function and
            the ulitmate hash value should contain 'n' number of 0's at initial's of hash value */
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        // repeating 0 -- diffculty times , where difficulty 2 and 0 will repeat 2 Times

        return new this({
            data,
            timestamp,
            prevHash,
            hash,
            nonce,
            difficulty
        });
    };

    /* Static method to adjust the difficulty level based on the time taken to mine the previous block.
    Parameters:
    - originalBlock: Previous block in the blockchain.
    - timestamp: Current timestamp.
    Returns the adjusted difficulty level. */
    // here time will not be on basis like bitcoin which has 10 min time a.k.a BlockTime
    static adjustDifficulty({originalBlock,timestamp}){
        const { difficulty } = originalBlock;

        if(difficulty<1) return 1;
        // If block took longer than expected time, reduce difficulty otherwise increase difficulty , by 1 unit for both condition
        const difference = timestamp-originalBlock.timestamp;
        if(difference > MINE_RATE) return difficulty-1;
        return difficulty+1;

    }
}


// Example blocks for testing purposes.
const block2 = new Block({
    data:"2ndBlock_ho_yo",
    timestamp:null,
    prevHash:"", //determined when mining
    hash:""
});

const block3 = new Block({
    data:"3rdBlock_ho_yo",
    timestamp:null,
    prevHash:"", //determined when mining
    hash:""
});


/* const genesisblock = Block.genesis();
console.log("GENESIS BLOCK:");
console.log(genesisblock); */

// Mining the staticly created block block2
// const result = Block.mineBlock({prevBlock:GENESIS_data,data:block2.data});
// console.log("Block 2");
// console.log(result);


// Exporting the Block class and example blocks for use in other modules.
module.exports = { 
    Block ,
    block2,
    block3
}