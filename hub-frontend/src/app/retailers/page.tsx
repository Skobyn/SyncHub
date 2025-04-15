import Link from "next/link";

export default function RetailersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Retailers</h1>
      <p className="mb-6 text-gray-600">This page will display a list of all retailers fetched from the backend API.</p>
      <div className="bg-white rounded shadow p-6">
        <p className="text-gray-500">[Retailer list will appear here]</p>
        <div className="mt-4">
          <Link href="/retailers/1" className="text-blue-600 hover:underline">View Retailer Example &rarr;</Link>
        </div>
      </div>
    </div>
  );
} 