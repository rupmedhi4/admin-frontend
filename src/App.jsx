import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routesHandler/routes';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getOrderDetails } from './slices/productsSlice';


function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchOrderedItems = async () => {
      try {
        await dispatch(getOrderDetails());
      } catch (err) {
        console.error('Error fetching order details:', err);
      }
    };
    fetchOrderedItems();
  }, []);

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
