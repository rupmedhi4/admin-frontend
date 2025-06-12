import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiAgent } from './../../apiAgent';
import { getOrderDetails } from '../../slices/productsSlice';

export default function ShowSingleOrder() {
  const { id } = useParams();
  const { totalOrderedProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const order = totalOrderedProducts?.find((item) => item._id === id);

  const handleStatusChange = async (e) => {
    setLoading(true);
    const newStatus = e.target.value;
    try {
      await axios.put(
        `${apiAgent.updateStatus}/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setLoading(false);
      alert("Status updated successfully");
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const fetchOrderedItems = async () => {
      try {
        await dispatch(getOrderDetails());
      } catch (err) {
        console.error('Error fetching order details:', err);
      }
    };
    fetchOrderedItems();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl font-semibold">
        Order not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={order.productId?.image || "/default.jpg"}
            alt={order.productId?.name}
            className="rounded-xl w-full max-h-[400px] object-cover border shadow-md"
          />
        </div>

        {/* Order Details */}
        <div className="text-gray-800 dark:text-white space-y-5">
          <h2 className="text-3xl font-bold border-b pb-2">{order.productId?.name}</h2>

          <p><span className="font-semibold">Price:</span> ₹{order.productId?.price}</p>

          <p><span className="font-semibold">Ordered Quantity:</span> {order.orderedQuantity}</p>

          <p><span className="font-semibold">Payment Mode:</span> {order.paymentMode || "Online"}</p>

          <p>
            <span className="font-semibold">Order Date:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {/* Address */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Delivery Address:</h3>
            <p><strong>Name:</strong> {order.address?.name}</p>
            <p><strong>Phone:</strong> {order.address?.number}</p>
            <p>
              <strong>Address:</strong>{" "}
              {order.address?.street}, {order.address?.city}, {order.address?.state},{" "}
              {order.address?.country} - {order.address?.pincode}
            </p>
          </div>

          {/* Status Dropdown */}
          <div className="pt-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Order Status
            </label>
            <select
              id="status"
              value={order.status}
              onChange={handleStatusChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {loading && (
              <p className="text-sm text-blue-600 mt-2">Updating status...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
