"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  // Call `useSession` unconditionally at the top
  const { data: session } = useSession();

  // Use state to check if rendering on the client side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-20">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Trailblaze Events</h1>
        <p className="text-lg text-gray-600">
          Discover, register, and participate in trail and ultramarathon races worldwide.
        </p>
      </header>

      <main className="flex flex-col items-center gap-8">
        <Image
          src="/images/trail-race.jpg"
          alt="Trail Running Event"
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />

        {/* Conditional Login/Register or Profile based on session */}
        {isClient && !session ? (
          <div className="flex gap-4">
            <button
              onClick={() => signIn("google")}
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600"
            >
              Sign in with Google
            </button>
            <Link href="/register">
              <a className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600">
                Register
              </a>
            </Link>
          </div>
        ) : isClient && session ? (
          <div className="flex gap-4">
            <Link href="/profile">
              <a className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600">
                View Profile
              </a>
            </Link>
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : null}

        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Races</h2>
          <p className="text-gray-600 mb-8">
            Explore upcoming trail and ultramarathon events near you.
          </p>
          <Link href="/races">
            <a className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600">
              Discover Races
            </a>
          </Link>
        </section>
      </main>

      <footer className="mt-16 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Trailblaze Events. All rights reserved.</p>
      </footer>
    </div>
  );
}
