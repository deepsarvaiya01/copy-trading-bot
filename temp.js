require('dotenv').config(); // ✅ Load env vars at the top

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_LOGIN_URI;

if (!uri) {
  console.error("❌ Environment variable DB_LOGIN_URI is not set.");
  process.exit(1);
}

console.log("📡 Connected");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("copy-trading-bot-db");
    const users = db.collection("users");

    const result = await users.insertOne({
      username: "deep",
      email: "deep@example.com",
      password: "asdfghjkl",
      createdAt: new Date()
    });

    console.log("🟢 Inserted User ID:", result.insertedId);

    const user = await users.findOne({ username: "deep" });
    console.log("🔍 Found user:", user);

  } catch (err) {
    console.error("❌ MongoDB operation failed:", err.message);
  } finally {
    await client.close();
    console.log("🔒 Connection closed.");
  }
}

run();
