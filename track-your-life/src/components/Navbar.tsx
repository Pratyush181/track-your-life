import React from "react";
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import LoginWithGoogle from "./LoginWithGoogle";

export default async function Navbar() {

    const session = await auth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a>Home</a></li>
                <li><a>Docs</a></li>
                <li><a>About</a></li>
            </ul>
            </div>
            <a className="btn btn-ghost text-xl">Track Your Life</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>Docs</a></li>
            <li><a>About</a></li>
            </ul>
        </div>
        <div className="navbar-end gap-3">
            {session?.user ? (
                // <div className="flex items-center gap-3">
                //     <p className="text-sm">{session.user.name}</p>
                //     <SignOutButton/>
                // </div>
                <div className="dropdown text-sm">
                    <div tabIndex={0} role="button" className="btn m-1">{session.user.name}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Profile</a></li>
                    <li><SignOutButton/></li>
                    </ul>
                </div>
                
            ) : (
                <LoginWithGoogle/>
            )}
        </div>
        </div>
  )
}