"use client";

import Link from "next/link";

export default function Home () {
  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <div className="w-64 h-64">
          <p>What is your name?</p>
          <input type="text" />
          <br />
          <Link href="/user_home">Submit</Link>
        </div>
      </div>
    </main>
  );
}
