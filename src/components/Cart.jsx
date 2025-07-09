import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import PurchaseForm from './PurchaseForm';         // Сатып алу формасы
import axios from "./axios";



// Бұл компонент қолданушы корзинасын көрсететін модаль терезені басқарады

function Cart({ close, apples = [], setApples, cartIds, setCartIds }) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);                     // Сатып алу формасының ашық екенін немесе жабық екенін бақылайды


   // Корзинадан товарды жою функциясы
  async function removeFromCart(phone_id) {
    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз");

    try {
      await axios.delete(`/cart/${phone_id}`, {                 //Серверге DELETE сұранысы жіберіледі
        headers: { Authorization: `Bearer ${token}` }                                //Токен — headers ішіне қосылады (пайдаланушыны тану үшін)
      });
      
      // Жойылған товарды күйден(state) алып тастау
      setApples(prev => prev.filter(item => item.phone_id !== phone_id));           //setApples(...) — товарлар тізімінен өшірілген товарды алып тастайды
      setCartIds(prev => prev.filter(id => id !== phone_id));                       //setCartIds(...) — корзина ішіндегі ID тізімінен де сол ID-ны өшіреді
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

   // Товардын quantity (саны) арттыру/азайту функциясы
  async function updateQuantity(phone_id, newQty) {
    if (newQty < 1) return; // Сан теріс не 0 болмауы тиіс

    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз");

    try {
      await axios.patch(`/cart/${phone_id}`, {              //Серверге PATCH сұранысы жіберіледі (деректі жартылай жаңарту)
        quantity: newQty                                                          // жаңа мән жіберіледі
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Күй(state) ішіндегі товардын quantity-ін жаңарту
      setApples(prev =>                                                               //Корзина ішіндегі товарлардын тізімі prev арқылы алынады
        prev.map(item =>
          item.phone_id === phone_id ? { ...item, quantity: newQty } : item          //Егер item.phone_id сәйкес болса: Сол элементтің quantity-ін жаңартады  ,  Басқа элементтер сол күйінде қалады
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <>
    {/* Модаль фоны */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Корзина тақырыбы мен жабу кнопкасы */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Себет</h2>
            <button onClick={close} className="text-red-600 text-xl">X</button>
          </div>

          {/* Егер корзина бос болса */}
          {apples.length === 0 ? (
            <p>Себет бос</p>
          ) : (
            <div className="flex flex-col gap-4">
              {apples.map(a => (
                <div key={a.phone_id} className="flex gap-2 items-center border-b pb-2">
                  <img className="w-[100px]" src={a.img} alt="" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{a.title}</h3>
                    <p>{a.color}</p>
                    <p>{a.price} ₸</p>

                    {/* Quantity басқару */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(a.phone_id, a.quantity - 1)}
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >-</button>
                      <span>{a.quantity}</span>
                      <button
                        onClick={() => updateQuantity(a.phone_id, a.quantity + 1)}
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >+</button>
                    </div>
                  </div>

                  {/* Жою кнопкасы */}
                  <CancelIcon
                    onClick={() => removeFromCart(a.phone_id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ))}

              {/* Сатып алу кнопкасы */}
              {apples.length > 0 && (
                <button 
                  onClick={() => setPurchaseOpen(true)} 
                  className="bg-blue-500 text-white rounded-lg cursor-pointer py-1.5 mt-4">
                  Сатып алу
                </button>
              )}
            </div>
          )}
        </div>
      </div>

       {/* Сатып алу формасы ашылса */}
      {purchaseOpen && (
        <PurchaseForm onClose={() => {
          setPurchaseOpen(false);
          close();  // Сонымен қатар корзинаны да жабады
        }} />
      )}
    </>
  );
}

export default Cart;