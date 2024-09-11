  require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_DB_CONNECTION;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  let db;

async function connectToMongoDB() {
    try {
      await client.connect();
      db = client.db('book_store'); // Replace with your database name
      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1); // Exit process with a failure code
    }
  }

  connectToMongoDB();

  module.exports = {
    getDb: () => db
  };