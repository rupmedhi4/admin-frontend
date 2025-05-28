

import Login from '../components/authPages/Login';
import Signup from '../components/authPages/Signup';
import Home from '../components/home/Home'
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
       <Home/>
      </ProtectedRoute>
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
];

export default routes;
