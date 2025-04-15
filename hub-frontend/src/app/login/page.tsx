import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Add authentication logic here
    if (!username || !password) {
      setError("Please enter both username and password.");
    } else {
      setError("");
      alert("Login logic not yet implemented.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-16">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Login</h1>
      <p className="mb-6 text-gray-600">Sign in to access the GrocerySync Hub dashboard.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
} 