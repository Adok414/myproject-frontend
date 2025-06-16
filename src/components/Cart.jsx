import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import PurchaseForm from './PurchaseForm';
import axios from 'axios';

function Cart({ close, apples = [], setApples, cartIds, setCartIds }) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  async function removeFromCart(phone_id) {
    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз");

    try {
      await axios.delete(`http://localhost:3000/cart/${phone_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setApples(prev => prev.filter(item => item.phone_id !== phone_id));
      setCartIds(prev => prev.filter(id => id !== phone_id));
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  async function updateQuantity(phone_id, newQty) {
    if (newQty < 1) return;

    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз");

    try {
      await axios.patch(`http://localhost:3000/cart/${phone_id}`, {
        quantity: newQty
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setApples(prev =>
        prev.map(item =>
          item.phone_id === phone_id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Себет</h2>
            <button onClick={close} className="text-red-600 text-xl">X</button>
          </div>

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
                  <CancelIcon
                    onClick={() => removeFromCart(a.phone_id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ))}
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

      {purchaseOpen && (
        <PurchaseForm onClose={() => {
          setPurchaseOpen(false);
          close();
        }} />
      )}
    </>
  );
}

export default Cart;