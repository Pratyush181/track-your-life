import clientPromise from '@/lib/mongodb'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    // Optionally, list databases to confirm connection
    const dbs = await client.db().admin().listDatabases();
    return NextResponse.json({ status: 'success', databases: dbs.databases });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}