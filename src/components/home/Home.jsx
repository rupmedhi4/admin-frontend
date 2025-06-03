import React, { useEffect } from 'react'
import SideBar from '../sideBar/SideBar'
import TopBar from '../TopBar/TopBar'
import { getAllCreateProducts } from '../../slices/productsSlice';
import { useDispatch } from 'react-redux';

export default function Home({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCreateProducts());
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}
