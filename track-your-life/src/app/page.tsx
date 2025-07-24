import heroImage from "../../public/hero.jpg";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();
  if (session?.user) {
    // Redirect to a sign-in page if the user is not authenticated.
    // This is a common pattern for NextAuth.js.
    redirect("/dashboard");
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <img
          src={heroImage.src}
          alt="Hero Image"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Track Your Life</h1>
          <p className="py-6">
            Get Better Everyday. Visualize It.
          </p>

          
          <LoginWithGoogle/>
        
          
        </div>
      </div>
    </div>
  );
}
