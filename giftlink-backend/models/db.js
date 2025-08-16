// db.js
import 'dotenv/config'; // ES module way to load dotenv
import { MongoClient } from 'mongodb'; // ES module import for MongoClient

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    const client = new MongoClient(url);
    await client.connect();
    dbInstance = client.db(dbName);
    return dbInstance;
}

export default connectToDatabase; // ES module default export
