'use client';

import { useSession } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return <div>No session found. Not logged in.</div>;
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Session Info</h2>
      <pre className="bg-gray-800 p-4 rounded-lg">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
