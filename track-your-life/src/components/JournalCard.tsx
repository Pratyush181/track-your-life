"use client";
import { useState } from "react";

const emojiOptions = [
    "😀", "😢", "😡", "😱", "😍", "😴", "🤔", "😇", "🥳", "😭", "😎", "😤"
];

export default function JournalCard() {
    const [moods, setMoods] = useState<string[]>(["", "", ""]);

    const handleMoodChange = (idx: number, value: string) => {
        const newMoods = [...moods];
        newMoods[idx] = value;
        setMoods(newMoods);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Journal Heading</legend>
                    <input type="text" className="input" placeholder="Type here" />
                </fieldset>

                <div className="flex flex-col items-center justify-center">
                    <p>Moods:</p>
                    <div className="flex gap-2 mt-2">
                        {[0, 1, 2].map((idx) => (
                            <select
                                key={idx}
                                className="input"
                                value={moods[idx]}
                                onChange={e => handleMoodChange(idx, e.target.value)}
                            >
                                <option value="">Select</option>
                                {emojiOptions.map((emoji) => (
                                    <option key={emoji} value={emoji}>{emoji}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}