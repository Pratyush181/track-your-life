import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import User from "../src/models/User.ts";

const MONGODB_URI = process.env.MONGODB_URI as string;

async function migrate() {
  await mongoose.connect(MONGODB_URI);

  // Add missing journalEntries and habits arrays if not present
  await User.updateMany(
    { journalEntries: { $exists: false } },
    { $set: { journalEntries: [] } }
  );
  await User.updateMany(
    { habits: { $exists: false } },
    { $set: { habits: [] } }
  );

  // Add missing fields to each journal entry for all users
  const users = await User.find({});
  for (const user of users) {
    let updated = false;

    // Ensure each journal entry has all required fields
    if (Array.isArray(user.journalEntries)) {
      for (const entry of user.journalEntries) {
        if (entry.heading === undefined) {
          entry.heading = "";
          updated = true;
        }
        if (entry.date === undefined) {
          entry.date = new Date();
          updated = true;
        }
        if (entry.text === undefined) {
          entry.text = "";
          updated = true;
        }
        if (entry.moods === undefined) {
          entry.moods = [];
          updated = true;
        }
      }
    }

    // Ensure each habit has all required fields
    if (Array.isArray(user.habits)) {
      for (const habit of user.habits) {
        if (habit.name === undefined) {
          habit.name = "";
          updated = true;
        }
        if (!Array.isArray(habit.history)) {
          habit.history = [];
          updated = true;
        } else {
          for (const hist of habit.history) {
            if (hist.date === undefined) {
              hist.date = new Date();
              updated = true;
            }
            if (hist.status === undefined) {
              hist.status = "not_completed";
              updated = true;
            }
          }
        }
      }
    }

    if (updated) {
      await user.save();
    }
  }

  console.log("Migration complete!");
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});