"use client"

import { useState, useEffect } from "react";
import JournalCard from "@/components/JournalCard";

export default function Journal() {
    const [journalEntries, setJournalEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showJournalCard, setShowJournalCard] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

    useEffect(() => {
        fetch("/api/journalEntries")
        .then(res => res.json())
        .then(data => {
            setJournalEntries(data.journalEntries || []);
            setLoading(false);
        })
    }, []);

    if (loading) return <div>Loading...</div>

    const handleSave = async (data: any) => {
        setSaving(true);
        let res;
        if (data._id) {
            // Update existing entry
            res = await fetch("/api/journalEntries", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } else {
            // Create new entry
            res = await fetch("/api/journalEntries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        }
        setSaving(false);
        if (res.ok) {
            setShowJournalCard(false);
            setSelectedEntry(null);
            setLoading(true);
            fetch("/api/journalEntries")
                .then(res => res.json())
                .then(data => {
                    setJournalEntries(data.journalEntries || []);
                    setLoading(false);
                });
        } else {
            alert("Failed to save journal entry.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;
        const res = await fetch("/api/journalEntries", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            setJournalEntries(journalEntries.filter(entry => entry._id !== id));
        } else {
            alert("Failed to delete entry.");
        }
    };

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
                        <th className="hidden sm:block ">Journal</th>
                        <th>Moods</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {journalEntries.map((entry, idx) => (
                            <tr key={idx} className="hover:bg-base-300 cursor-pointer"
                                onClick={() => {
                                setSelectedEntry(entry);
                                setShowJournalCard(true);
                            }}>
                                <th>{new Date(entry.date).toLocaleDateString()}</th>
                                <td className="lg:w-100 overflow-hidden whitespace-nowrap truncate">{entry.heading}</td>
                                <td className="lg:w-75 hidden sm:block overflow-hidden whitespace-nowrap truncate">{entry.text}...</td>
                                <td>{entry.moods?.join(", ") || ""}</td>
                                <td>
                                    <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={e => {
                                        e.stopPropagation(); // Prevent row click
                                        handleDelete(entry._id);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                    
                                </td>
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
                        <JournalCard
                            onSave={handleSave}
                            loading={saving}
                            onClose={() => setShowJournalCard(false)}
                            entry={selectedEntry} // Pass the entry here
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

