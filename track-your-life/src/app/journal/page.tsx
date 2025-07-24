import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongoose";
import User, { IUser } from "@/models/User";

export default async function Journal() {
    const session = await auth();
 
    if (!session?.user) {
        // Redirect to a sign-in page if the user is not authenticated.
        // This is a common pattern for NextAuth.js.
        redirect("/api/auth/signin");
    }
    await connectToDatabase();
    const user = await User.findOne(
        { email: session.user.email },
    "journalEntries").lean() as IUser | null;

    const journalEntries = user?.journalEntries || [];

    return(

        <div>
            <div className="flex gap-1 items-baseline p-4">
                <p className="text-2xl font-semibold">
                    {session.user.name}'s Journal
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
                                <td>{entry.text.slice(0, 30)}...</td>
                                <td>{entry.text}</td>
                                <td>{entry.moods.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

