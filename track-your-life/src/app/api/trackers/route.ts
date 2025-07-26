import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import  User, { IUser } from "@/models/User";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

// get all habits
export async function GET() {
    const session = await auth();
    
    
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized. Please Log in." }, { status: 401 });
    }
    
    await connectToDatabase();

    const user = await User.findOne({
        email: session.user.email},
        "habits").lean() as IUser | null;

    if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ habits: user.habits || [] });

}


// add habit
export async function POST(request: Request){
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized. Please Log in." }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if(!name){
        return NextResponse.json({error: "Failed to create habit. Missing required fields"}, { status: 400 })
    }

    await connectToDatabase();

    const newHabit = {
        _id: new mongoose.Types.ObjectId(),
        name,
        history:[]
    };

    const updateResult = await User.updateOne(
        { email: session.user.email },
        {
            $push: {
                habits: newHabit
            }
        }
    )

    if (updateResult.modifiedCount === 0) {
        return NextResponse.json({ error: "Failed to create journal habit." }, { status: 500 });
    }

    return NextResponse.json({ habit: newHabit }, { status: 201 });
}