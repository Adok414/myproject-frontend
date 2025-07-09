import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



// Бұл компонент нақты бір товар туралы толық мәліметті көрсетеді

function AppleDetails({ cartIds, setCartIds }) {
  const [phones, setPhones] = useState(null);         // Нақты бір товардын дерегі
  const phone_id = Number(useParams().id);            // URL-ден товар ID-сін алу
  const added = cartIds?.includes(phone_id);          // Бұл өнім корзинага қосылған ба?


  // Компонент жүктелген кезде серверден осы товар туралы мәлімет алу
  useEffect(() => {                                                      //Компонент жүктелгенде немесе phone_id өзгерсе, ішіндегі код орындалады
    axios.get('http://localhost:3000/phones/' + phone_id)                 //Серверге GET /phones/:id сұранысы жіберіледі (мысалы, /phones/7)
      .then(res => setPhones(res.data))                                   //Серверден келген мәліметті күйге (state) сақтайды
      .catch(err => alert(err.message));
  }, [phone_id]);


  // Корзинага қосу функциясы
  async function addToCart() {
    const token = localStorage.getItem('token');
    if (!token) return alert("Алдымен жүйеге кіріңіз.");

    try {
      await axios.post("http://localhost:3000/cart", {                  //Серверге POST /cart деген сұраныс жібереді
        phone_id: phone_id,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }                    //headers ішінде токен беріліп жатыр (пайдаланушыны тану үшін)
      });

      if (typeof setCartIds === 'function') {                             //Бұл — басты беттегі "Себетке қосу" батырмасының күйін автоматты түрде өзгертуге көмектеседі
        setCartIds(prev => [...prev, phone_id]);
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }



  // Мәлімет әлі жүктелмеген болса, "жүктелуде" деген жазу көрсетет
  if (!phones) {
    return <div className='flex justify-center items-center h-full'>Деректер жүктелуде...</div>;
  }

  return (
    <div className='flex py-10 px-16 gap-6 max-md:flex-col max-sm:flex-col'>
      {/* Товардын фотосы */}
      <img className='w-1/4 max-sm:w-xl' src={phones.img} alt="" />
      {/* Товардын сипаттамасы */}
      <div className='space-y-2 flex flex-col justify-center'>
        <h1 className='text-3xl font-bold text-blue-950 max-sm:self-center'>{phones.title}</h1>
        <p className='text-xl max-sm:self-center'>{phones.color}</p>
        <p>{phones.discription}</p>
        <div className='flex gap-16 items-center'>
          <p className='font-medium text-red-900 text-2xl'>{phones.price} ₸</p>
          {/* корзинага қосу кнопкасы */}
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