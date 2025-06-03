import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../slices/productsSlice';
import RecentOrders from './RecentOrders';

export default function Dashboard() {
const dispatch = useDispatch()
const {totalOrderedProducts,totalMyProducts}= useSelector(state=>state.product)


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

  const pendingOrders = totalOrderedProducts.filter((item)=>item.status==="pending")
  const deliveredOrders = totalOrderedProducts.filter((item)=>item.status==="delivered")

  const summaryData = [
    { label: "Total Orders", quantity: `${totalOrderedProducts.length}`, color: "bg-pink-200" },
    { label: "Pending Orders", quantity: `${pendingOrders.length}`, color: "bg-blue-200" },
    { label: "delivered Orders", quantity: `${deliveredOrders.length}`, color: "bg-teal-200" },
    { label: "Total Products", quantity: `${totalMyProducts.length}`, color: "bg-indigo-200" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans w-full">
      <h1 className="text-2xl font-bold mb-6">Welcome to Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div key={index} className={`${item.color} text-center p-4 rounded-lg shadow-md`}>
            <p className="text-sm text-gray-600">{item.label}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl mx-auto font-bold">{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
     <RecentOrders totalOrders={totalOrderedProducts}/>
    </div>
  )
}
