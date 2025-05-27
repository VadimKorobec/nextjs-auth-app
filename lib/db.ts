import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  if (!uri) {
    return;
  }
  const client = await MongoClient.connect(uri);

  return client;
};
