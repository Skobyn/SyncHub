"use client";

import AuthButton from "components/AuthButton";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-16">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Login</h1>
      <p className="mb-6 text-gray-600">Sign in to access the GrocerySync Hub dashboard.</p>
      <AuthButton />
    </div>
  );
} 