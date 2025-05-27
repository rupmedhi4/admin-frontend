

import Login from '../components/authPages/Login';
import Signup from '../components/authPages/Signup';
import Home from '../components/home/Home'
import PublicRoute from './PublicRoute';

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
       <Home/>
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    )
  },
  {
    path: "/admin/create-product",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    )
  },
];

export default routes;
