import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDatabase } from "./mongoose";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: new Date(),
          journalEntries: [],
          habits: [],
        });
      }
      return true;
    },
    // Optionally, add a session callback to include custom user data in the session
    async session({ session }) {
      await connectToDatabase();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user._id = dbUser._id.toString();
        // Add more fields if needed
      }
      return session;
    },
  },
});