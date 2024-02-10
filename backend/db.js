const { MongoClient } = require('mongodb');

const databaseName = "yourDatabaseName"; // Replace with your actual database name
const username = "hacker"; // Replace with your actual username
const password = "health1234"; // Replace with your actual password

const uri = `mongodb+srv://${username}:${password}@hacklytics.nfetbna.mongodb.net/${databaseName}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(databaseName); // Return the database instance
  } catch (err) {
    throw err;
  }
}

module.exports = connectToDatabase;