import React, { useEffect } from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Cart from './Cart';
import Auth from './Auth';
import axios from 'axios';

function Header({ cartIds, setCartIds }) {

   const [cartOpen, setCartOpen] = useState(false);
   const [formOpen, setFormOpen] = useState(false);
   const [username, setUsername] = useState(null);
   const [cartData, setCartData] = useState([]);

   const handleCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios 
        .get("${import.meta.env.VITE_API_BASE_URL}/cart", {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          setCartData(res.data);
          setCartIds(res.data.map(item => item.phone_id));
          setCartOpen(true);
        })
        .catch((err) => alert(err.response?.data?.error || err.message));
    } else {
      alert("Алдымен жүйеге кіріңіз.");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      axios
        .get("${import.meta.env.VITE_API_BASE_URL}/profile", {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setUsername(res.data.first_name))
        .catch(err => console.log(err.message));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    setCartData([]);
    setCartIds([]);
  };

  return (
    <header className='bg-cyan-800 flex items-center justify-between p-4'>
      <h1 className='text-white text-4xl font-bold max-sm:text-2xl'>AppleStore</h1>
      <div className='text-white flex gap-4 items-center'>
        <ShoppingCartCheckoutIcon onClick={handleCart} className='cursor-pointer' />

        {username ? (
          <div className='flex items-center gap-2'>
            <p>{username}</p>
            <button
              onClick={handleLogout}
              className='text-white text-sm bg-red-500 rounded px-2 py-1 hover:bg-red-700 transition'>
              Шығу
            </button>
          </div>
        ) : (
          <ManageAccountsIcon onClick={() => setFormOpen(true)} className='cursor-pointer' />
        )}
      </div>

      {
        cartOpen && (
          <Modal open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart 
              close={() => setCartOpen(false)} 
              apples={cartData} 
              setApples={setCartData} 
              setCartIds={setCartIds} 
              cartIds={cartIds}
            />
          </Modal>
        )
      }

      {
        formOpen && (
          <Modal open={formOpen} onClose={() => setFormOpen(false)}>
            <Auth close={() => setFormOpen(false)} />
          </Modal>
        )
      }

    </header>
  )
}

export default Header