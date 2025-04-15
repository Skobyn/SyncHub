import { useParams } from "next/navigation";

export default function RetailerDetailPage() {
  // Placeholder for dynamic route param
  // In a real app, use router or fetch data based on ID
  // For now, just show a static example
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Retailer Detail</h1>
      <p className="mb-6 text-gray-600">This page will display details for a specific retailer, including agent status and job info.</p>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Retailer Name</h2>
        <p className="text-gray-500 mb-4">[Retailer details and status will appear here]</p>
        <div className="mt-4">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Agent Online</span>
        </div>
      </div>
    </div>
  );
} 