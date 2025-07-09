import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'                                                //TailwindCSS және жалпы стильдер
import App from './App.jsx'                                         // Басты бет компоненті
import { BrowserRouter, Routes, Route } from 'react-router-dom'     // Маршрутизатор
import AppleDetails from './components/AppleDetails.jsx'            // Өнімнің толық мәліметі беті
import Layout from './components/Layout.jsx'                        // Header + Footer орамасы
import { useState, useEffect } from 'react';
import axios from "./axios";                                          // HTTP сұраныстарға арналған кітапхана

function RootWrapper() {
  const [cartIds, setCartIds] = useState([]);                       // Себетке қосылған тауарлардың ID тізімі (стейт)



   // Қолданба алғаш жүктелген кезде, егер токен бар болса, себеттегі тауар ID-ларын серверден алу
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const ids = res.data.map(item => item.phone_id);            // Себеттегі өнімдердің ID-ларын шығарып алу
        setCartIds(ids);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout cartIds={cartIds} setCartIds={setCartIds}>                {/* Layout компоненті: Header, Footer және children ретінде Route элементтер */}
        <Routes>
          <Route path='/' element={<App cartIds={cartIds} setCartIds={setCartIds} />} />  {/* Басты бет, өнімдердің тізімі көрсетіледі */}
          <Route path='/Apples/:id' element={<AppleDetails cartIds={cartIds} setCartIds={setCartIds} />} />   {/* Жеке өнім туралы бет, URL арқылы өнім ID-сін алады */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// React қолданбасын DOM-ға орнату
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootWrapper />
  </StrictMode>
);
