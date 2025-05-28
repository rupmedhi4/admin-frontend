import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const navItems = [
    {
        name: 'Dashboard',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        isActive: true,
        route: "/"
    },
    {
        name: 'Orders',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        isActive: false,
        route: "/admin/orders"
    },
    {
        name: 'Products',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4-8-4" />
            </svg>
        ),
        isActive: false,
        route: "/admin/products"
    },

];

export default function SideBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await dispatch(logoutUser())
            console.log(res);
            if ("auth / logoutUser / fulfilled") {
                alert("Logout successful")
                navigate("/login")
            } else {
                alert("something went wrong")
            }
        } catch (err) {
            alert("something went wrong")
            console.log(err)
        }
    }

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            <nav className="mt-6 flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={`${item.route}`}
                                className={`flex items-center px-4 py-2 rounded-lg mx-2 transition-colors ${item.isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center px-4 py-2 mt-6 cursor-pointer mx-2 ">
                    <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                    </svg>
                    <button onClick={logoutHandler} className="text-white font-medium">
                        Logout
                    </button>
                </div>

            </nav>
        </div>
    );
}