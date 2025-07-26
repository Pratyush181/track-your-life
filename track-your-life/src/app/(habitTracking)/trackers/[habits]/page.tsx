"use client"

// app/trackers/[habit]/page.tsx
import { useParams } from 'next/navigation';

export default function HabitTrackerPage() {
  const params = useParams();
  const habitName = params.habits; // gets 'gym', 'study', etc.

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">{habitName} Tracker</h1>
      <p>This is the tracker for your habit: {habitName}</p>
      {/* You can now fetch or display habit-specific data here */}
    </div>
  );
}
