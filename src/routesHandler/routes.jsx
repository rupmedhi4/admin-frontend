

import Login from '../components/authPages/Login';
import Signup from '../components/authPages/Signup';
import Home from '../components/home/Home'
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/dashboard/Dashboard';
import OrderList from '../components/orders/OrderList';
import ShowSingleOrder from '../components/orders/ShowSingleOrder';
import CreateProduct from '../components/createProducts/CreateProduct';

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
       <Home>
          <Dashboard />
        </Home>
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
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute>
        <Home>
          <OrderList />
        </Home>
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Home>
          <Dashboard />
        </Home>
      </ProtectedRoute>
    )
  },
  {
    path: "/order/:id",
    element: (
      <ProtectedRoute>
        <Home>
          <ShowSingleOrder />
        </Home>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/create-products",
    element: (
      <ProtectedRoute>
        <Home>
          <CreateProduct />
        </Home>
      </ProtectedRoute>
    )
  },
];

export default routes;
