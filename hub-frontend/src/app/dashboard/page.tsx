import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Dashboard</h1>
      <p className="mb-8 text-gray-600">Welcome to the GrocerySync Hub! Here you can monitor system status, manage retailers, and view logs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Retailers</h2>
          <p className="mb-2 text-gray-500">Manage and view all registered retailers.</p>
          <Link href="/retailers" className="text-blue-600 hover:underline">Go to Retailers &rarr;</Link>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Logs</h2>
          <p className="mb-2 text-gray-500">View system and agent logs for troubleshooting.</p>
          <Link href="/logs" className="text-blue-600 hover:underline">View Logs &rarr;</Link>
        </div>
      </div>
      <div className="mt-12 text-sm text-gray-400">System metrics and status widgets coming soon.</div>
    </div>
  );
} 