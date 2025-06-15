import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function AppleCard({ apple, cartIds, setCartIds }) {
  const added = cartIds.includes(apple.phone_id);

  async function addToCart() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Алдымен жүйеге кіріңіз.");
      return;
    }

    axios
      .post("${import.meta.env.VITE_API_BASE_URL}/cart", { phone_id: apple.phone_id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setCartIds(prev => [...prev, apple.phone_id]);
      })
      .catch(e => alert(e.response?.data?.error || e.message));
  }

  return (
    <div className='flex flex-col justify-between gap-6 p-4 shadow-2xl'>
      <img className='w-1/2 self-center' src={apple.img}  alt="" />

      <Link to={`/apples/${apple.phone_id}`}>
        <h3 className='hover:underline font-bold text-xl  text-blue-950 text-center'>{apple.title}</h3>
      </Link>

      <div className='flex justify-around'>
        <p className='font-medium'>{apple.color}</p>
        <p className='text-blue-900 font-medium'>{apple.price} ₸</p>
      </div>

      <button
        onClick={addToCart}
        disabled={added}
        className={`p-2 rounded font-bold cursor-pointer ${added ? 'bg-green-400' : 'bg-blue-400 text-white'}`}
      >
        {added ? 'Себетке қосылды' : 'Себетке қосу'}
      </button>
    </div>
  )
}

export default AppleCard