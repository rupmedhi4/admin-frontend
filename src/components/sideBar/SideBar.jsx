import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../slices/authSlice';
import { navItems } from './NavItems.jsx';


export default function SideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await dispatch(logoutUser());
            if (res.meta.requestStatus === "fulfilled") {
                alert("Logout successful");
                navigate("/login");
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            alert("Something went wrong");
            console.log(err);
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            <nav className="mt-6 flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.route}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 rounded-lg mx-2 transition-colors ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-700 text-gray-300'
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div
                    onClick={logoutHandler}
                    className="flex items-center px-4 py-2 mt-6 cursor-pointer mx-2 hover:bg-red-600 transition-colors rounded-lg"
                >
                    <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                    </svg>
                    <span className="text-white font-medium">Logout</span>
                </div>
            </nav>
        </div>
    );
}
