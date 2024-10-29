// app/page.js

"use client"; // Ensure this page is client-rendered

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import SessionStatus from "./components/SessionStatus";

function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome to Trailblaze Events</h1>
        <p>Discover and participate in exciting trail and ultramarathon races.</p>
      </header>

      {/* Only client-side session actions */}
      <SessionStatus />

      <main className="mt-10">
        <Image
          src="/images/trail-race.jpg"
          alt="Trail Running Event"
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <Link href="/dashboard">
          <a className="btn mt-6">Go to Dashboard</a>
        </Link>
      </main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
