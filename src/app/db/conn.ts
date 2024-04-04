import mongoose from "mongoose";
import * as dotenv from "dotenv";

//load environment variables
dotenv.config();

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.ATLAS_URI as string;

let _db: mongoose.Connection;

export default {
  // connection to the MongoDB database via mongoose and log different connection status
  connectToServer: async function () {
    try {
      const connection = mongoose.connection;
      connection.on("connecting", function () {
        console.log("🔄️ MongoDB database connection in progress ...");
      });
      connection.on("open", function () {
        console.log("✅ MongoDB database connection established successfully");
      });
      connection.on("disconnected", function () {
        console.log("❌ MongoDB database connection lose");
      });
      _db = connection;

      await mongoose.connect(uri);
    } catch (error) {
      console.log("❌ Mongoose connection failed", error);
    }
  },
  getDb: function () {
    return _db;
  },
};
