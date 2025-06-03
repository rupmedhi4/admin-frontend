import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SingleCreateProduct() {
  const { id } = useParams();
  const { totalMyProducts } = useSelector((state) => state.product);
  const currentProduct = totalMyProducts.find((product) => product._id === id);

  if (!currentProduct) {
    return <div className="text-center text-red-500 mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div >
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-96 object-contain rounded-lg border"
          />
         
       
        </div>

        {/* Right Detail Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{currentProduct.name}</h1>
          <p className="text-gray-600">{currentProduct.description}</p>
          <p className="text-2xl font-semibold text-green-600">₹ {currentProduct.price}</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">Category:</span> {currentProduct.category}</p>
            <p><span className="font-semibold">In Stock:</span> {currentProduct.quantity}</p>
            <p><span className="font-semibold">Ordered:</span> {currentProduct.orderedQuantity}</p>
            <p><span className="font-semibold">Seller ID:</span> {currentProduct.sellerId}</p>
            <p className="text-xs text-gray-500">Created At: {new Date(currentProduct.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
