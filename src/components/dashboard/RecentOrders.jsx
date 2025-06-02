import React from 'react';

export default function RecentOrders({ totalOrders }) {
  const recentOrders = totalOrders
    ? [...totalOrders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    canceled: "bg-red-100 text-red-700",
    shipped: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b bg-gray-50">
              <th className="p-3 font-medium">Order ID</th>
              <th className="p-3 font-medium">Product</th>
              <th className="p-3 font-medium">Amount</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="p-3 text-gray-700">{order._id}</td>
                  <td className="p-3 text-gray-700">{order.productId?.category || "N/A"}</td>
                  <td className="p-3 text-gray-700">₹{order.productId?.price || "0"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No recent orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
