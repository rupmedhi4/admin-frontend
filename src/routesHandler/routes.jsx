

import Login from '../components/authPages/Login';
import Signup from '../components/authPages/Signup';
import PublicRoute from './PublicRoute';

const routes = [
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
