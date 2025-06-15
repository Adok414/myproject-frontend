import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AppleDetails({ cartIds, setCartIds }) {
  const [phones, setPhones] = useState(null);
  const phone_id = Number(useParams().id);
  const added = cartIds?.includes(phone_id);

  useEffect(() => {
    axios.get('https://iphone-backend.onrender.com/phones/' + phone_id)
      .then(res => setPhones(res.data))
      .catch(err => alert(err.message));
  }, [phone_id]);

  async function addToCart() {
    const token = localStorage.getItem('token');
    if (!token) return alert("Алдымен жүйеге кіріңіз.");

    try {
      await axios.post("https://iphone-backend.onrender.com/cart", {
        phone_id: phone_id,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (typeof setCartIds === 'function') {
        setCartIds(prev => [...prev, phone_id]);
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  if (!phones) {
    return <div className='flex justify-center items-center h-full'>Деректер жүктелуде...</div>;
  }

  return (
    <div className='flex py-10 px-16 gap-6 max-md:flex-col max-sm:flex-col'>
      <img className='w-1/4 max-sm:w-xl' src={phones.img} alt="" />
      <div className='space-y-2 flex flex-col justify-center'>
        <h1 className='text-3xl font-bold text-blue-950 max-sm:self-center'>{phones.title}</h1>
        <p className='text-xl max-sm:self-center'>{phones.color}</p>
        <p>{phones.discription}</p>
        <div className='flex gap-16 items-center'>
          <p className='font-medium text-red-900 text-2xl'>{phones.price} ₸</p>
          <button
            onClick={addToCart}
            disabled={added}
            className={`p-2 rounded cursor-pointer ${added ? 'bg-green-500 text-white' : 'bg-blue-900 text-white'}`}>
            {added ? 'Себетке қосылды' : 'Себетке қосу'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppleDetails;