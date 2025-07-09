import React, { useEffect } from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Cart from './Cart';
import Auth from './Auth';
import axios from "./axios";


// Бұл компонент жоғарғы панель (header) ретінде жұмыс істейді: логотип, корзина, авторизацияны қамтиды

function Header({ cartIds, setCartIds }) {

   const [cartOpen, setCartOpen] = useState(false);     // Корзина модалі ашық па?
   const [formOpen, setFormOpen] = useState(false);     // Авторизация формасы ашық па?
   const [username, setUsername] = useState(null);      // Қолданушы аты (логиннен кейін)
   const [cartData, setCartData] = useState([]);        // Корзинадагы товарлар деректері


    //  Корзина иконкасына басқанда — егер токен бар болса, серверден дерек сұрап, модаль ашылады
   const handleCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios 
        .get("http://localhost:3000/cart", {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          setCartData(res.data);                              // Корзина товарларын сақтау
          setCartIds(res.data.map(item => item.phone_id));    // Корзина ID-ларын жаңарту
          setCartOpen(true);                                  // Модаль ашу
        }) 
        .catch((err) => alert(err.response?.data?.error || err.message));
    } else {
      alert("Алдымен жүйеге кіріңіз.");
    }
  }


  //  Қолданушы аты шығуы үшін — токен бар болса, профильден first_name аламыз
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      axios
        .get("http://localhost:3000/profile", {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setUsername(res.data.first_name))
        .catch(err => console.log(err.message));
    }
  }, []);


  // Шығу батырмасы басылса — токенді тазалау, username және cart күйін тазалау
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    setCartData([]);
    setCartIds([]);
  };

  return (
    <header className='bg-cyan-800 flex items-center justify-between p-4'>
      {/* Логотип */}
      <h1 className='text-white text-4xl font-bold max-sm:text-2xl'>AppleStore</h1>

      <div className='text-white flex gap-4 items-center'>
        {/* Корзина иконкасы */}
        <ShoppingCartCheckoutIcon onClick={handleCart} className='cursor-pointer' />

        {/* Егер логин жасалса — аты мен шығу батырмасы */}
        {username ? (
          <div className='flex items-center gap-2'>
            <p>{username}</p>
            <button
              onClick={handleLogout}
              className='text-white text-sm bg-red-500 rounded px-2 py-1 hover:bg-red-700 transition'>
              Шығу
            </button>
          </div>
        ) : (       // Егер жүйеге кірмеген болса — аккаунт иконкасы арқылы авторизация модалін ашу
          <ManageAccountsIcon onClick={() => setFormOpen(true)} className='cursor-pointer' />
        )}
      </div>


       {/* Корзина модаль терезесі */}
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

       {/* Авторизация модаль терезесі */}
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