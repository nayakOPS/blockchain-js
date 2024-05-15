const { Block, block2, block3 } = require("./block.js");
const { cryptoHash } = require("./crypto-hash.js");

// Definition of the Blockchain class responsible for managing blocks and maintaining chain integrity.
class Blockchain{

    // Constructor function initializes the blockchain with a genesis block.
    constructor(){
        this.chain = [Block.genesis()];
    }

    /* Method to add a new block to the blockchain.
    Parameters:
    - data: Data to be stored in the new block */
    addBlock({data}){
        // Mine a new block using the previous block and provided data.
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data
        });
        // Add the newly mined block to the blockchain.
        this.chain.push(newBlock);
    }

        // Method to replace the current blockchain with a longer valid chain
        replaceChain(chain){
            // console.log(chain);
            // console.log(this.chain);
            // Check if the incoming chain is longer than the current chain.
            if(chain.length <=this.chain.length){
                console.error("The Incoming Chain is Not Longer");
                return;
            }

            // Check if the incoming chain is valid.
            if(!Blockchain.isValidChain(chain)){
                console.error("The Incoming Chain is Not Valid");
                return;
            }

            // if the chain is valid and longest then added to current chain
            this.chain = chain;
        }

        /* Method to validate the integrity of a blockchain.
        Parameters:
        - chain: The blockchain to be validated.
        Returns true if the blockchain is valid, false otherwise. */
        static isValidChain(chain){
            // two different object instances comparison(chain,genesis), so converted to strings
            // Check if the genesis block matches the first block in the chain.
            if( (JSON.stringify(chain[0])) !== (JSON.stringify(Block.genesis())) ){
                // console.log("at initail checking of Genesis Block");
                return false;
            }

            // don't need to check genesis block at [0], validated earlier
            // Validate each subsequent block in the chain.
            for(let i=1; i<chain.length; i++){
                const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
                const lastDifficulty = chain[i-1].difficulty;
                // realLastHash = current i'th block prev-hash === previous block hash
                // reallastHash == current i'th block prev hash
                const realLastHash = chain[i-1].hash;

                /*console.log(realLastHash);
                console.log(prevHash);*/

                // Ensure the previous hash of the current block matches the hash of the previous block.
                if(prevHash !== realLastHash){
                    return false;
                }

                // Validate the hash of the current block.
                const validatedHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
                // checking for the hash value of the block hash and incall hash function
                /* console.log(validatedHash);
                console.log(hash); */

                if(hash !== validatedHash){
                    return false;
                }

                // the miner shouldn't be able to compromise the overal network with adjusting larger difficulty so Validating it 
                // abs provide absolute value unsifned int

                // Ensure the difference in difficulty between consecutive blocks is not greater than 1.
                if(Math.abs(lastDifficulty-difficulty) > 1 ) return false;
            }

            // The blockchain is valid if all blocks pass the validation checks.
            return true;
        }
}


// Example usage:
const blockchain = new Blockchain();
blockchain.addBlock({data:block2.data});
// console.log("Added Block 2 completely from block.js which was imported as block2");

blockchain.addBlock({data:block3.data});
blockchain.addBlock({data:"4thBlock_ho_yo"});


/* const result = Blockchain.isValidChain(blockchain.chain);
console.log(result); */

// console.log(blockchain.chain);


module.exports = Blockchain;