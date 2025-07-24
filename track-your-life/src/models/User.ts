// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    createdAt: Date;
    journalEntries: {
      heading: string,
      date: Date;
      text: string;
      moods?: [string, string, string];
    }[];
    habits: {
      name: string;
      history: {
        date: Date;
        status: 'completed' | 'not_completed' | 'kinda';
      }[];
    }[];
  }
  

  const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String,
    createdAt: { type: Date, default: Date.now },
    journalEntries: {
      type: [
        {
          heading: { type: String, required: true},
          date: Date,
          text: String,
          moods: [String], // or [String, String, String] if you want to enforce length
        },
      ],
      default: [],
    },
    habits: {
      type: [
        {
          name: String,
          history: [
            {
              date: Date,
              status: { type: String, enum: ['completed', 'not_completed', 'kinda'] },
            },
          ],
        },
      ],
      default: [],
    },
  });

  export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);