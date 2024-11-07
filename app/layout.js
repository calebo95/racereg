// app/layout.js

import Link from "next/link";
import ClientProvider from "./components/ClientProvider.js"; // Import ClientProvider
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider> {/* Wrap children with ClientProvider */}
          <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Race Registration</h1>
              <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/profile">Profile</Link>
                {/* Add more links as needed */}
              </div>
            </nav>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
