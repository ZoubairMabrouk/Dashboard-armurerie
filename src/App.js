import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ListProducts from './pages/products/ListProducts';
import ListCategory from './pages/category/ListCategory';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ListCard from './clients/ListCard';
import { CartProvider } from 'use-shopping-cart';
import Wrapper from './clients/Pannier';
import Commande from './clients/Commande';
import User from './pages/user/User';
import { getProfile } from './services/auth';
import Navbar from './components/NavBar';
import Command from './pages/commandes/Commande';

const App = () => {
  const location = useLocation(); 
  const hideSidebarRoutes = ['/', '/register'];
  const [admin,setAdmin] = useState();
  const fetchuser = async ()=>{
    try{
      const response = await getProfile();
      setAdmin(response.admin);
      console.log(response);
      console.log(admin);
    } catch (error){
      console.error(error);
    }
  } //
  useEffect(()=>{
    fetchuser();
  },[]);
  const showSidebar = !hideSidebarRoutes.includes(location.pathname) && admin === 1;

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: '20px' }}>
        
        <CartProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cards' element={<ListCard/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ListProducts />} />
          <Route path="/category" element={<ListCategory />} />
          <Route path="/register" element={<Register />} />
          <Route path='/pannier'  element={<Wrapper/>} />
          <Route path='/commande' element={<Commande />} />
          
          <Route path='/command' element={<Command />} />
          <Route path='/users' element={<User />} />
        </Routes>
        </CartProvider>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
