import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProducts } from '../../slices/productsSlice';
import MyProductsTable from './MyProductsTable';

export default function ShowProducts() {
  const dispatch = useDispatch();
  const { totalMyProducts,loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : totalMyProducts?.length === 0 ? (
        <p>No products found...</p>
      ) : (
        <MyProductsTable />
      )}
    </div>
  );
}
