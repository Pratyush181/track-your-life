import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
 
    if (!session?.user) {
        // Redirect to a sign-in page if the user is not authenticated.
        // This is a common pattern for NextAuth.js.
        redirect("/api/auth/signin");
    }
    const user = session.user;

    return(

        <div>
            {/* top section */}
            <div className="p-8 space-y-4">

                {/* Top row */}
                <div className="grid grid-cols-3 gap-6">
                    
                    {/* Left column (2 cols) */}
                    <div className="col-span-2 flex flex-col gap-3">
                    {/* Greeting */}
                    <div className="rounded-lg bg-base-100  min-h-[50px]">
                        
                        <div className="flex gap-1 items-baseline">
                            <span className="text-sm font-light">Welcome,</span>
                            <p className="text-2xl font-semibold">
                                {session.user.name}
                            </p>
                        </div>
                            
                    </div>
                    {/* Trackers */}
                    <div className="border rounded-lg bg-base-100 p-5 flex-1 min-h-[400px]">
                        <p className="text-lg font-semibold">Trackers</p>
                    </div>
                    </div>

                    {/* Right column */}
                    <div className="border rounded-lg bg-base-100 p-5 min-h-[450px]">
                    <p className="text-lg font-semibold">Goals</p>
                    </div>

                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="border rounded-lg bg-base-100 min-h-[200px] p-4">
                    <p>Coming Soon!</p>
                    </div>
                    <div className="border rounded-lg bg-base-100 min-h-[200px] p-4">
                    <p>Coming Soon!</p>
                    </div>
                    <div className="border rounded-lg bg-base-100 min-h-[200px] p-4">
                    <p>Coming Soon!</p>
                    </div>
                </div>

            </div>

            {/* bottom section */}

                
            
        </div>
    );
}

