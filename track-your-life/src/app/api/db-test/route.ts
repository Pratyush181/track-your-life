import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return NextResponse.json({ status: 'success', users });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}