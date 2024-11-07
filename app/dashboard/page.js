"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';

function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.data?.user?.id) {
      fetch(`/api/profile/${session.data.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.isDirector ? "director" : data.isRunner ? "runner" : null);
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, [session]);

  if (session.status === "loading") return <p>Loading session...</p>;
  if (!session.data) return <p>User session could not be loaded. Please log in.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {userRole === "director" ? "Race Director Dashboard" : "Runner Dashboard"}
      </h2>
      <div className="mt-4">
        <Link href="/race-finder" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Race Finder
        </Link>
      </div>
      {/* Role-specific content here */}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
