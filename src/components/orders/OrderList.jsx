import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrderList() {
  const { totalOrderedProducts } = useSelector((state) => state.product);
  console.log(totalOrderedProducts);


  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    canceled: "bg-red-100 text-red-700",
    shipped: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-[#0F172A] min-h-screen p-6 text-white">
      <div className="bg-[#1E293B] rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order List</h2>
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-[#334155] text-white px-4 py-2 rounded-md focus:outline-none placeholder-gray-300"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-600">
                <th className="p-3 text-left">SERIAL NO</th>
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">PRICE</th>
                <th className="p-3 text-left">STATUS</th>
                <th className="p-3 text-left">DATE</th>
                <th className="p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {totalOrderedProducts?.length > 0 ? (
                totalOrderedProducts.map((order, index) => (
                  <tr key={order._id} className="border-b border-gray-700 hover:bg-[#1F2937]">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{order.productId.name || "XYZ"}</td>
                    <td className="p-3 font-semibold">${order.productId?.price || "0.00"}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        View
                      </Link>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
