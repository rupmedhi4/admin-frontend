import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setEditId, setIsEdit, setIsFormOpen } from '../../slices/productsSlice';

export default function MyProductsTable() {
    const { totalMyProducts } = useSelector(state => state.product);
    const dispatch = useDispatch();


    const editHandler = (id)=>{
        dispatch(setIsFormOpen());
        dispatch(setIsEdit());
        dispatch(setEditId(id));

    }

    return (
        <div className="overflow-x-auto max-w-full">
            <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm border border-gray-600 rounded-lg">
                    <thead className="sticky top-0 bg-gray-800 text-white z-10">
                        <tr className="text-gray-400 border-b border-gray-600">
                            <th className="p-3 text-left">Serial No</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Created At</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalMyProducts?.map((product, index) => (
                            <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-300">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3 font-semibold">₹{product.price}</td>
                                <td className="p-3">{product.quantity}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "NA"}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={()=>editHandler(product._id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs cursor-pointer">
                                        Edit
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
