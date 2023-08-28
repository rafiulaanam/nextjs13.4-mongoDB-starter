import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

export async function connectToDatabase() {
  // if (!client || !client.isConnected()) {
  //   await client.connect();
  // }
  db = client.db(dbName);
  console.log("Connected to MongoDB");
}

export function getDb() {
  if (!db) {
    throw new Error("Database not connected.");
  }
  return db;
}
