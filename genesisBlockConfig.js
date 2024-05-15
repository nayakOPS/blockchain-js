// Configuration for the genesis block:

// Define the time interval in milliseconds required to mine a block.
const MINE_RATE = 1000; // 1000ms = 1s

// Define the initial difficulty level for mining blocks.
const INITIAL_DIFFICULTY = 2;

const GENESIS_data={
    data:"1stBlock",
    timestamp:0,
    prevHash:"0",
    hash:"0aef456f",
    nonce:0,
    difficulty:INITIAL_DIFFICULTY
};

// Export the genesis data and mining rate constants.
module.exports= { GENESIS_data, MINE_RATE };  