import React from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Cart from './Cart';
import Auth from './Auth';

function Header() {

   const [cartOpen, setCartOpen] = useState(false);
   const [formOpen, setFormOpen] = useState(false);

  return (
    <header className='bg-cyan-800 flex items-center justify-between p-4'>
        <h1 className='text-white text-4xl font-bold max-sm:text-2xl'>AppleStore</h1>
        <div className='text-white flex gap-4'>
            <ShoppingCartCheckoutIcon onClick={() => setCartOpen(true)} className='cursor-pointer' />
            <ManageAccountsIcon onClick={() => setFormOpen(true)} className='cursor-pointer' />
        </div>
        {

            cartOpen && (
              <Modal open={cartOpen} onClose={() => setCartOpen(false)}> 
                   <Cart close = {() => setCartOpen(false)} />
              </Modal>
            )

        }

        {

            formOpen && (
              <Modal open={formOpen} onClose={() => setFormOpen(false)}>
                <Auth close = {() => setFormOpen(false)} />
              </Modal>
            )  
           
        }
    </header>
  )
}

export default Header