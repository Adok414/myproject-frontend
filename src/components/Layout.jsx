import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, cartIds, setCartIds }) {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header cartIds={cartIds} setCartIds={setCartIds} />
      <div className='flex-1'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;