// app/components/SessionStatus.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function SessionStatus() {
  const session = useSession(); // Check if useSession is defined before using

  if (!session || session?.status === "loading") {
    return <p>Loading session...</p>;
  }

  if (!session?.data) {
    return (
      <div className="flex gap-4 justify-center">
        <button onClick={() => signIn("google")} className="btn">
          Sign in with Google
        </button>
        <Link href="/register">
          <a className="btn">Register</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2>Welcome, {session.data.user.name}</h2>
      <button onClick={() => signOut()} className="btn">
        Sign Out
      </button>
    </div>
  );
}
