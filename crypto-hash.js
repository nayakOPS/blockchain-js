const crypto = require('crypto');

// Function to calculate the cryptographic hash of input data.
const cryptoHash = (...inputs) => {
    // Create a SHA-256 hash object using the crypto module.
    const hash = crypto.createHash('sha256');
    // Concatenate all input data and update the hash object.
    hash.update(inputs.join(""));
    // Return the hexadecimal digest of the hash.
    return hash.digest("hex");
};

/* const result = cryptoHash("Hello","CryptoWorld");
console.log(result); */

// Export the cryptoHash function for use in other modules.
module.exports = { cryptoHash };