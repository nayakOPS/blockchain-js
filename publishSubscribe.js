// Import the 'redis' module for handling Publish Subscribe Model functionality.
const redis = require('redis');

// Define channels for communication between publisher and subscriber.
const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}

// Implement the Publish-Subscribe model for blockchain communication.
class PubSub{

    constructor({blockchain}){
        // Store reference to the blockchain instance.
        this.blockchain = blockchain; 

        // Create Redis clients for publishing and subscribing.
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // Subscribe to designated channels.
        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        // Handle incoming messages on subscribed channels.
        // on event , if any message event handle the message
        this.subscriber.on('message',(channel,message)=>{
            this.handleMessage(channel,message);
        });
    }

    // Handle incoming messages based on channel and take appropriate action.
    handleMessage(channel,message){
        console.log(`Message recieved Channel : ${channel} Message: ${message}`);
        const parseMessage = JSON.parse(message);
        // console.log(parseMessage);
        if(channel === CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parseMessage);
        }
    };

    // Publish a message to a specific channel.
    publish({channel,message}){
        this.publisher.publish(channel,message);
    }

    // Broadcast the blockchain to all subscribers.
    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            // converting the array chain into String
            message:JSON.stringify(this.blockchain.chain)
        })
    }
}

// const checkPubSubObj = new PubSub();
// publishing the message in the test channel with data "hello"
// 1 sec delay taken for process of publishing and subscribing
// setTimeout( () => checkPubSubObj.publisher.publish(CHANNELS.TEST, "Helloo"), 1000);

// Export the PubSub class for use in other modules.
module.exports = PubSub;