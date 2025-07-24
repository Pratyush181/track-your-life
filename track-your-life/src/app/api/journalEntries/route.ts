import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import  User, { IUser } from "@/models/User";
import { auth } from "@/lib/auth";

export async function GET(){
    const session = await auth();


    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized. Please Log in." }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({
        email: session.user.email},
        "journalEntries").lean() as IUser | null;

    if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ journalEntries: user.journalEntries || [] });
}