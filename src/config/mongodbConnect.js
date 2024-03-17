/***************************************************************************************
 * Desc: Connect to MongoDB Atlas using the Node.js driver
 * 
 * Table of Contents:
 *   Imports: 
 *    -{MongoClient, ServerApiVersion}: The MongoClient constructor from the Node.js driver
 *    -env: The env module
 * 
 *   Variables:
 *    -uri: The URI to connect to MongoDB Atlas
 *    -client: The MongoClient object
 * 
 *  Functions:
 *    -client.connect(): Connect to MongoDB Atlas
 *  Exports: 
 *    -client
 ***************************************************************************************/

/***********************
  Imports:
***********************/
const { MongoClient, ServerApiVersion } = require('mongodb');
const env = require('dotenv');

env.config();

/***********************
 * Variables:
 ************************/
// The URI to connect to MongoDB Atlas
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/*********************************************************
 * Functions:
 * client.connect(): Connect to MongoDB Atlas
 * -Returns: A Promise that resolves to the client object
 * -Throws: An error if the connection fails
 * -Side Effects: Connects to MongoDB Atlas
 * -Modifies: None
 * -Example: client.connect().then(client => {console.log('connected')})
 * -Notes: None
 * -Issues: None
 *********************************************************/
client.connect();

/*********************************************************
 * Exports:
 * client
 * -Type: MongoClient
 * -Description: The MongoClient object
 * -Example: const client = require('./mongodbConnect');
 * -Notes: None
 * -Issues: None
 *********************************************************/
module.exports = client;
