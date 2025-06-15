import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppleDetails from './components/AppleDetails.jsx'
import Layout from './components/Layout.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';

function RootWrapper() {
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("https://iphone-backend.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const ids = res.data.map(item => item.phone_id);
        setCartIds(ids);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout cartIds={cartIds} setCartIds={setCartIds}>
        <Routes>
          <Route path='/' element={<App cartIds={cartIds} setCartIds={setCartIds} />} />
          <Route path='/Apples/:id' element={<AppleDetails cartIds={cartIds} setCartIds={setCartIds} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootWrapper />
  </StrictMode>
);
