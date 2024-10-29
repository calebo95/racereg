"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Profile() {
  const session = useSession(); // Avoid destructuring directly
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isRunner: false,
    isDirector: false,
  });

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
          setFormData({
            name: data.name || session.data.user.name,
            email: data.email || session.data.user.email,
            phone: data.phone || "",
            isRunner: data.isRunner || false,
            isDirector: data.isDirector || false,
          });
        });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called with formData:", formData);
    console.log("handleSubmit called with session data:", session?.data);
    if (session?.data?.user?.id) {
      try {
        const response = await fetch(`/api/profile/${session.data.user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Profile updated successfully");
          router.push("/dashboard");
        } else {
          const errorData = await response.json();
          console.error("Failed to update profile:", errorData);
          alert("Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (session.status === "loading") return <p>Loading session...</p>;
  if (!session.data) return <p>User session could not be loaded. Please log in.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          disabled
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 w-full"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isRunner"
            checked={formData.isRunner}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isRunner">I am a runner</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isDirector"
            checked={formData.isDirector}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isDirector">I am a race director</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
