import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">GrocerySync Hub <span className="text-base text-gray-500">Support Edition</span></h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Centralized, secure platform for POS support companies to manage, automate, and monitor grocery item data exports from diverse client POS systems to e-commerce platforms.
        </p>
      </header>
      <main className="flex flex-col gap-6 items-center w-full max-w-md">
        <div className="flex gap-4 w-full justify-center">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Login</Link>
          <Link href="/dashboard" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">Dashboard</Link>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Need help? See the <a href="https://github.com/Skobyn/SyncHub" target="_blank" rel="noopener noreferrer" className="underline">project documentation</a>.</p>
        </div>
      </main>
      <footer className="mt-16 text-xs text-gray-400">&copy; {new Date().getFullYear()} GrocerySync Hub</footer>
    </div>
  );
}
