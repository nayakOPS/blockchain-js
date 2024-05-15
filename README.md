---

# Blockchain Project

## Overview

This project implements a blockchain system in JavaScript, providing a decentralized and tamper-resistant ledger for recording transactions. It includes features such as block creation, mining, validation, and peer-to-peer communication.

## Features

- **Block Creation**: Creation of blocks containing transactional data.
- **Genesis Block**: Initial block serving as the starting point of the blockchain.
- **Block Mining**: Addition of new blocks to the blockchain through a mining process.
- **Blockchain Validation**: Validation of the blockchain to ensure data integrity.
- **Longest Chain Rule**: Consensus mechanism where nodes follow the longest chain rule.
- **Nonce**: Adjustment of a nonce value to meet a difficulty target for mining.
- **Dynamic Difficulty**: Adjustment of the blockchain's difficulty target to regulate mining rate.
- **Node Creation**: Creation of nodes to participate in the blockchain network.
- **Transaction Writing**: Writing of transactional data onto the blockchain.
- **Block Distribution**: Distribution of blocks across the network for synchronization.
- **Peer Creation**: Establishment of peer connections for blockchain communication.
- **Blockchain Syncing**: Synchronization of blockchains between nodes to maintain consistency.

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/blockchain-project.git
```

2. Install dependencies:

```
cd blockchain-project
npm install
```

## Usage
### Accessing Blockchain Data

To access the blockchain data, send a GET request to the following endpoint:
```
GET /api/blocks
```
This will retrieve the current state of the blockchain.

### Mining New Blocks

To mine new blocks and add them to the blockchain, send a POST request with the desired data to the following endpoint:
```
POST /api/mine
```
This will initiate the mining process and add the new block to the blockchain.




### Starting a Node

To start a node and join the blockchain network, run the following command:

```
npm start
```

This will start the node and expose endpoints for interacting with the blockchain.

### Running as a Peer Node

To run the node as a peer, allowing for peer-to-peer communication and blockchain synchronization, use the following command:

```
npm run dev-peer
```

This command starts the node in peer mode, enabling communication with other nodes in the network.

## Dependencies

- `hextoBinary`: Converts hexadecimal strings to binary format.
- `express`: Web framework for creating RESTful APIs.
- `body-parser`: Middleware for parsing request bodies in Express.
- `nodemon`: Development tool for automatically restarting the server.
- `redis`: In-memory data store for implementing pub/sub functionality.
- `corss-env`: Environment variable utility for cross-platform compatibility.
- `request`: Simplifies making HTTP requests for blockchain communication.

---
