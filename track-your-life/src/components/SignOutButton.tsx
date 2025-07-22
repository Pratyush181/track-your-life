import { signOut } from "@/lib/auth";
 
export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <button type="submit" className="btn btn-ghost">Sign Out</button>
    </form>
  )
}