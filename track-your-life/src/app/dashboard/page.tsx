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
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <p>Welcome to Dashboard</p>

            {/* User Details */}
            <p className="text-lg font-semibold">Hello, {user.name ?? 'User'}!</p>
        </div>
    );
}

