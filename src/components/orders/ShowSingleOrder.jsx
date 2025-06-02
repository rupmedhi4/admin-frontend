import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiAgent } from './../../apiAgent';
import { getOrderDetails } from '../../slices/productsSlice';

export default function ShowSingleOrder() {
    const { id } = useParams();
    const { totalOrderedProducts } = useSelector((state) => state.product);
    const dispatch = useDispatch()


    const order = totalOrderedProducts?.find((item) => item._id === id);
    const [loading, setLoading] = useState(false);



    const handleStatusChange = async (e) => {
        setLoading(true)
        const newStatus = e.target.value;

        try {
            const res = await axios.put(
                `${apiAgent.updateStatus}/${id}`,
                { status: newStatus },
                { withCredentials: true }
            );
            setLoading(false)
            alert("status updated successfully")
        } catch (error) {
            alert("something went wrong")

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

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <div className="w-full max-w-3xl h-auto md:h-[450px] bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-6">
    {
      order ? (
        <>
          {/* Image Section */}
          <div className="w-full md:w-1/3 h-full">
            <img
              src={order.productId?.image || "/default.jpg"}
              alt={order.productId?.name}
              className="w-full h-full object-cover rounded-lg border"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 space-y-3 text-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold">{order.productId?.name || "Product Name"}</h2>

            <p className="text-gray-600 dark:text-gray-300">
              <strong>Price:</strong> ₹{order.productId?.price || "0.00"}
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="flex items-center gap-2">
              <label htmlFor="status" className="font-semibold">
                Status:
              </label>
              <select
                id="status"
                value={order.status}
                onChange={handleStatusChange}
                disabled={loading}
                className="px-3 py-1 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {loading && <p className="text-sm text-blue-500">Updating status...</p>}
          </div>
        </>
      ) : (
        <p className="text-xl mx-auto font-semibold text-red-500">Order not found!</p>
      )
    }
  </div>
</div>

    );
}
