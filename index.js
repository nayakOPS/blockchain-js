const bodyParser = require('body-parser');
const request = require('request');
const express = require("express");
const Blockchain = require("./blockchain.js");
const PubSub = require("./publishSubscribe.js");

const DEFAULT_PORT = 3001;
let PEER_PORT; // ports for peer node

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

// Sync to be made with the root Node i.e npm start
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// Broadcast the blockchain to peers after a delay
setTimeout(() => pubsub.broadcastChain(), 1000);

// accepting the data in JSON format, using body-parser middleware
app.use(bodyParser.json());

// Endpoint to retrieve the entire blockchain
app.get('/api/blocks',(req,res)=>{
    // converting the object to JSON too
    res.json(blockchain.chain);
});

// Endpoint for mining a new block
app.post('/api/mine',(req,res) => {
    // miner who create block will send the block in JSON fromat and will write in Block
    const { data } = req.body;

    blockchain.addBlock({data});
    // broadcasting the added chain
    pubsub.broadcastChain();
    // after adding the block redirecting to api/blocks
    res.redirect('/api/blocks');
});

// Sync the blockchain with the root node
const syncChains = () =>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body) => {
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body);
            console.log('Replace chain on sync with',rootChain);
            // if the rootchain is longer than current chain then it will be replaced
            blockchain.replaceChain(rootChain);
        }
    });
}

// Generate a random peer port if specified in the environment
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
    // return PEER_PORT;
}

// Use the peer port if available, otherwise use the default port
const PORT = PEER_PORT || DEFAULT_PORT ;

app.listen(PORT,() => {
    console.log(`Listening to the port no : ${PORT}`);
    syncChains();
});