import clientPromise from '@/lib/mongodb'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    // Optionally, list databases to confirm connection
    const dbs = await client.db().admin().listDatabases();
    return NextResponse.json({ status: 'success', databases: dbs.databases });
  } catch (error: unknown) {
    let message = 'An unknown error occurred';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as any).message;
    }
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}