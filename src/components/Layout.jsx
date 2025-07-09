import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Бұл компонент Header, Footerды  бірнеше бетке бірдей қолданады

function Layout({ children, cartIds, setCartIds }) {             //children — ішіндегі контент (мысалы, басты бет, тауар беті т.б.)
  return (                                                       //cartIds — себетке қосылған тауар ID-лары   //setCartIds — сол күйді жаңартатын функция   //Бұл параметрлер App.jsx арқылы беріледі.
    <div className='flex flex-col h-screen justify-between'>                   

      {/* Жоғарғы панель — логотип, себет, авторизация */}
      <Header cartIds={cartIds} setCartIds={setCartIds} />

      {/* Негізгі контент (бет мазмұны) */}        
      <div className='flex-1'>  
        {children}                                                         
      </div> 

      {/* Төменгі панель (әлеуметтік иконкалар мен авторлық құқық) */}
      <Footer />
    </div>
  );
}

export default Layout;