import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../slices/productsSlice';

export default function CreateProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        quantity: ''
    });
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [screenLoader, setScreenLoader] = useState(true)

    const dispatch = useDispatch()
    const {loading}= useSelector(state=>state.product)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await dispatch(createProduct(product))
            setIsFormOpen(!isFormOpen)
            if(res.type="product/createProduct/fulfilled"){
                alert('products create successfully!');
            }else{
                alert('error creating product');
            }
        } catch (error) {
            console.log(error)
           alert('error creating product');  
        }
    };

    return (
        <>
            {
                isFormOpen ?
                    <>
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-4">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white shadow-xl rounded-lg w-full max-w-3xl  p-6 space-y-4"
                            >
                                <h2 className="text-xl font-semibold text-center text-gray-700">
                                    Submit Product Info
                                </h2>

                                <div className='flex space-x-9'>
                                    <div>
                                        <label className="text-sm font-medium block">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={product.name}
                                            onChange={handleChange}
                                            required
                                            className="w-85 mt-1 p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block">Price (₹)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            required
                                            className="w-85 mt-1 p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="text-sm font-medium block">Description</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                        className="w-full mt-1 p-2 border border-gray-300 rounded text-sm resize-none"
                                    ></textarea>

                                </div>

                                <div>
                                    <label className="text-sm font-medium block">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={product.image}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                                    />
                                </div>

                                <div className='flex space-x-9'>
                                    <div>
                                        <label className="text-sm font-medium block">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={product.category}
                                            onChange={handleChange}
                                            required
                                            className="w-85 mt-1 p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={product.quantity}
                                            onChange={handleChange}
                                            required
                                            className="w-85 mt-1 p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition cursor-pointer"
                                >
                                   {loading ? "Submitting....":"Submit"}
                                </button>
                            </form>
                        </div>

                    </> :
                    <div className="pt-12 flex items-center justify-center ">
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded shadow-md"
                        >
                            Create Product
                        </button>
                    </div>

            }

        </>
    );
}
