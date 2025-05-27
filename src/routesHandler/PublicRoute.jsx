import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PublicRoute({ children }) {
    const isLoggedIn = Cookies.get("jwt"); 

    return isLoggedIn ? <Navigate to="/" /> : children
}
