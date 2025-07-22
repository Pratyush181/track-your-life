import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
 
    if (!session?.user) {
        // Redirect to a sign-in page if the user is not authenticated.
        // This is a common pattern for NextAuth.js.
        redirect("/api/auth/signin");
    }

    const { user } = session;

    return(
        // <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        //     <p>Welcome to Dashboard</p>

        //     {/* User Details */}
        //     <p className="text-lg font-semibold">Hello, {user.name ?? 'User'}!</p>
        // </div>

        <div>
            {/* top section */}
            <div className="flex gap-6 p-8 pb-4">
  
                {/* Left column */}
                <div className="w-2/3 flex flex-col justify-between gap-3">
                    {/* greeting */}
                    <div className="border rounded-lg bg-base-100 p-5 min-h-[50px]">
                    <p className="text-lg font-semibold">Welcome {session.user.name}</p>
                    </div>

                    {/* habit, mood, journal tracker */}
                    <div className="border rounded-lg bg-base-100 p-5 flex-1">
                    <p className="text-lg font-semibold">Trackers</p>
                    </div>
                </div>

                {/* Right column (Goals) */}
                <div className="border rounded-lg bg-base-100 p-5 min-h-[450px] w-1/3">
                    <p className="text-lg font-semibold">Goals</p>
                </div>

                </div>

            {/* bottom section */}
            <div className="flex gap-6 pt-0 p-8">
                <div className="border rounded-lg bg-base-100 min-h-[200px] w-1/3">
                    <p>Coming Soon!</p>
                </div>

                <div className="border rounded-lg bg-base-100 min-h-[200px] w-1/3">
                    <p>Coming Soon!</p>
                </div>

                <div className="border rounded-lg bg-base-100 min-h-[200px] w-1/3">
                    <p>Coming Soon!</p>
                </div>

            </div>

                
            
        </div>
    );
}

