const { Blockchain } = require('./blockchain');
const blockchain = new Blockchain();

// Add a new block to the blockchain with some sample data.
blockchain.addBlock({ data: "new_block_data"});

// console.log(blockchain.chain[blockchain.chain.length-1]);

let prevTimestamp,nextTimestamp,nextBlock,timeDiff,averageTime;

// Array to store time differences for calculating average time.
const times = [];


// Generate and mine 1000 blocks to simulate blockchain growth.
for(let i=0; i<1000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data:`block ${i}`});
    // Get the newly added block.
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    // Get the timestamp of the newly added block.
    nextTimestamp = nextBlock.timestamp

    // Calculate the time difference between mining consecutive blocks.
    timeDiff = nextTimestamp-prevTimestamp;
    // Store the time difference in the times array.
    times.push(timeDiff);

    // Calculate the average time to mine a block based on all recorded time differences.
    averageTime = times.reduce((total,num) => (total+num))/times.length;

    console.log(` Block No : ${i} , Time to Mine Block: ${timeDiff}ms , Diffculty:${nextBlock.difficulty} , Average Time : ${averageTime}ms  `);
}

