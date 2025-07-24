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

export async function POST(request: Request){
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized. Please Log in." }, { status: 401 });
    }

    const body = await request.json();
    const { heading, date, text, moods } = body;

    if(!heading || !date || !text){
        return NextResponse.json({error: "Failed to create journal entry. Missing required fields"})
    }

    await connectToDatabase();

    const updateResult = await User.updateOne(
        { email: session.user.email },
        {
            $push: {
                journalEntries: { heading, date, text, moods }
            }
        }
    )

    if (updateResult.modifiedCount === 0) {
        return NextResponse.json({ error: "Failed to create journal entry." }, { status: 500 });
    }

    return NextResponse.json({ message: "Journal entry created successfully." }, { status: 201 });
}