"use client";
import { useEffect, useState, useRef } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";


const emojiOptions = [
    "😀", "😢", "😡", "😱", "😍", "😴", "🤔", "😇", "🥳", "😭", "😎", "😤"
];

export default function JournalCard({ 
    onSave,
    loading,
    onClose, 
    entry
}: { 
    onSave: (data: any) => void,
    loading: boolean,
    onClose: () => void,
    entry?: any

}) {
    const [moods, setMoods] = useState<string[]>(entry?.moods || ["", "", ""]);
    const [heading, setHeading] = useState(entry?.heading || "");
    const [text, setText] = useState(entry?.text || "");
    const [date, setDate] = useState<Dayjs>(entry?.date ? dayjs(entry.date) : dayjs());
    const [userName, setUserName] = useState<string>("");


    useEffect(() => {
        fetch("/api/auth/session")
            .then(res => res.json())
            .then(data => {
                setUserName(data?.user?.name || "");
            });
    }, []);

    const handleMoodChange = (idx: number, value: string) => {
        const newMoods = [...moods];
        newMoods[idx] = value;
        setMoods(newMoods);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-4xl">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">

                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue!)}
                        slotProps={{ textField: { size: "small" } }}
                    />
                </LocalizationProvider>


                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Journal Heading</legend>
                    <input
                        type="text"
                        className="input"
                        placeholder="Type here"
                        value={heading}
                        onChange={e => setHeading(e.target.value)}
                    />
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
            <div className="w-full">
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">What's on your mind?</legend>
                    <textarea
                        className="textarea h-24 w-full"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <div className="label">{userName}</div>
                </fieldset>
            </div>
            <div className="flex justify-end gap-x-2 mt-4 w-full">
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => onSave({
                        _id: entry?._id,
                        heading,
                        text,
                        moods,
                        date: date ? date.toISOString() : new Date().toISOString()
                    })}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={onClose}
                    disabled={loading}
                >
                    Close
                </button>
            </div>
        </div>
    );
}