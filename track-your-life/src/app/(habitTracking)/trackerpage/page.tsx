"use client";
import { useState, useEffect } from "react";

interface Habit {
    _id: string;
    name: string;
}

export default function Page() {

    const[habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/trackers")
        .then(res => res.json())
        .then(data => {
            setHabits(data.habits || []);
            setLoading(false);
        })
    }, []);

    return (
        <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Create Tracker</h1>
                <p>This is the page where you can create a new habit tracker.</p>
            </div>

            <div className="border-1 rounded-3xl p-4 m-4 flex items-end justify-center gap-6">

                <fieldset className="fieldset">
                    <input type="text" className="input" placeholder="Type here" />
                </fieldset>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-neutral-600 cursor-pointer hover:text-neutral-300 transition-colors mb-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>


            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-5">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Habit Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={2} className="text-center">Loading habits...</td></tr>
                        ) : habits.length > 0 ? (
                            habits.map((habit) => (
                                <tr key={habit._id}>
                                    <td>{habit.name}</td>
                                    <td>{/* Action buttons can go here */}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={2} className="text-center">No habits found. Add one above!</td></tr>
                        )}
                    </tbody>
                </table>
                </div>

            
        </div>
    );
}