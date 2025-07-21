// scripts/migrateUsers.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import User from "../src/models/User.ts";


const MONGODB_URI = process.env.MONGODB_URI as string;

async function migrate() {
  await mongoose.connect(MONGODB_URI);

  // Add missing fields to all users
  await User.updateMany(
    { journalEntries: { $exists: false } },
    { $set: { journalEntries: [] } }
  );
  await User.updateMany(
    { habits: { $exists: false } },
    { $set: { habits: [] } }
  );

  console.log("Migration complete!");
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});