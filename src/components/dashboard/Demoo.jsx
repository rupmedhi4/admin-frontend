import React from 'react';

const summaryData = [
  { label: "Total Orders", value: "2.5K", growth: "+4.8%", color: "bg-pink-200" },
  { label: "Revenue", value: "$5,782", growth: "+2.3%", color: "bg-blue-200" },
  { label: "Sales", value: "385", growth: "+1.8%", color: "bg-teal-200" },
  { label: "Customers", value: "1,192", growth: "+0.8%", color: "bg-indigo-200" },
  { label: "Date", value: "3.123", growth: "+0.78%", color: "bg-green-200" },
];

const recentOrders = [
  { id: "01 127.972", customer: "Joe Smith", amount: "$2.59", status: "Completed", date: "Apr. 28" },
  { id: "01236495", customer: "Peter Lenz", amount: "$16.00", status: "Pending", date: "Apr. 17" },
  { id: "01234553", customer: "Andy Lee", amount: "$25.50", status: "Canceled", date: "Apr. 21" },
  { id: "01233630", customer: "John Haug", amount: "$37.50", status: "Parced", date: "Jan. 9" },
  { id: "02234566", customer: "Patrick Leo", amount: "$12.00", status: "Canceled", date: "Feb. 16" },
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Canceled: "bg-red-100 text-red-700",
  Parced: "bg-blue-100 text-blue-700",
};

export default function Demoo() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans w-full">
      <h1 className="text-2xl font-bold mb-6">Welcome to Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div key={index} className={`${item.color} text-center p-4 rounded-lg shadow-md`}>
            <p className="text-sm text-gray-600">{item.label}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl mx-auto font-bold">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.amount}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
