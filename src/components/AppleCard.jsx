import axios from "./axios";
import React from 'react'
import { Link } from 'react-router-dom'


// Бұл компонент бір өнімнің карточкасын көрсетеді. Себетке қосу батырмасын да қамтиды.

function AppleCard({ apple, cartIds, setCartIds }) {
  const added = cartIds.includes(apple.phone_id);                     //осы товар бұрын корзинага қосылды ма, жоқ па — соны тексеру.

  async function addToCart() {                                        // Себетке (корзина) товарды қосу функциясы
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Алдымен жүйеге кіріңіз.");
      return;
    }

    axios
      .post("http://localhost:3000/cart", { phone_id: apple.phone_id, quantity: 1 }, {    //жыберылетын деректер
        headers: { Authorization: `Bearer ${token}` }              //токенды косу
      })
      .then(res => {
        setCartIds(prev => [...prev, apple.phone_id]);                // ID-ны күйге қосу
      })
      .catch(e => alert(e.response?.data?.error || e.message));
  }

  return (
    <div className='flex flex-col justify-between gap-6 p-4 shadow-2xl'>
      {/* товардын фотосы */}
      <img className='w-1/2 self-center' src={apple.img}  alt="" />       
       {/* сол товарга кыру ушын ссылка */}
      <Link to={`/apples/${apple.phone_id}`}>     
        <h3 className='hover:underline font-bold text-xl  text-blue-950 text-center'>{apple.title}</h3>
      </Link>
      {/* товардын тусы жане багасы */}
      <div className='flex justify-around'>
        <p className='font-medium'>{apple.color}</p>
        <p className='text-blue-900 font-medium'>{apple.price} ₸</p>
      </div>
       {/* корзинага косатын кнопка */}
      <button
        onClick={addToCart}
        disabled={added}         // Егер қосылған болса, кнопка бұғатталады
        className={`p-2 rounded font-bold cursor-pointer ${added ? 'bg-green-400' : 'bg-blue-400 text-white'}`}
      >
        {added ? 'Себетке қосылды' : 'Себетке қосу'}
      </button>
    </div>
  )
}

export default AppleCard