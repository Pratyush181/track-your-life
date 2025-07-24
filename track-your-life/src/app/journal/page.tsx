"use client"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { connectToDatabase } from "@/lib/mongoose";
import User, { IUser } from "@/models/User";
import { useState, useEffect } from "react";
import JournalCard from "@/components/JournalCard";

export default function Journal() {
    // const session = await auth();
 
    // if (!session?.user) {
    //     // Redirect to a sign-in page if the user is not authenticated.
    //     // This is a common pattern for NextAuth.js.
    //     redirect("/api/auth/signin");
    // }
    // await connectToDatabase();
    // const user = await User.findOne(
    //     { email: session.user.email },
    // "journalEntries").lean() as IUser | null;

    // const journalEntries = user?.journalEntries || [];

    const [journalEntries, setJournalEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showJournalCard, setShowJournalCard] = useState(false);

    useEffect(() => {
        fetch("/api/journalEntries")
        .then(res => res.json())
        .then(data => {
            setJournalEntries(data.journalEntries || []);
            setLoading(false);
        })
    }, []);

    if (loading) return <div>Loading...</div>

    return(

        <div>
            <div className="flex gap-1 items-baseline p-4">
                <p className="text-2xl font-semibold">
                    Your Journal
                </p>
            </div>

            <div className="overflow-x-auto p-7 pt-1">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Brief</th>
                        <th>Journal</th>
                        <th>Moods</th>
                    </tr>
                    </thead>
                    <tbody>
                        {journalEntries.map((entry, idx) => (
                            <tr key={idx} className="hover:bg-base-300">
                                <th>{new Date(entry.date).toLocaleDateString()}</th>
                                <td>{entry.heading}...</td>
                                <td>{entry.text}</td>
                                <td>{entry.moods?.join(", ") || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col items-center justify-center p-8">
                <p className="mb-2">Add Journal Entries</p>
                <button className="btn btn-neutral btn-outline w-36" onClick={() => setShowJournalCard(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

            </div>

            {showJournalCard && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded shadow-lg min-w-[300px]">
                        <JournalCard />
                        <button
                            className="btn btn-sm btn-primary mt-4"
                            onClick={() => setShowJournalCard(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

