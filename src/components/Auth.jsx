import axios from 'axios';
import React, { useState } from 'react'


// Бұл компонент қолданушыны тіркеу және жүйеге кіру формаларын көрсетеді

function Auth({ close }) {

  const [isRegistration, setIsRegistration] = useState(true);    // true → тіркелу формасы, false → кіру формасы
  const [registerData, setRegisterData] = useState({email: "", password: "", first_name: "", last_name: "", address: "", phone_number: ""});  // Тіркелу деректері (барлық өрістер)
  const [loginData, setLoginData] = useState({email: "", password: ""});   // Кіру деректері (email + құпия сөз)


  

   //  Тіркелу мәліметін серверге жібереді
   async function register(e) {                                        //Форма submit болғанда бетті жаңартпау үшін e.preventDefault() колданылады
    e.preventDefault();
    axios.post("http://localhost:3000/register", registerData)         //registerData мәліметін серверге /register маршрутына POST сұраныспен жібереді
    .then((res) => { 
      alert("Тіркелу сәтті өтті! Енді жүйеге қайта кіріңіз.");
      setIsRegistration(false);                                       // Тіркелген соң кіру формасына ауысу
    })
   }

 
   //  Жүйеге кіру сұранысын жіберу
   async function login(e) {                                         //Кіру деректерін серверге жібереді, токенді сақтайды
    e.preventDefault();
    axios.post("http://localhost:3000/login", loginData)             //Email мен құпиясөзді серверге /login арқылы жібереді
    .then((res) => {
      const token = res.data.token;                                  // Токенді сақтау
      localStorage.setItem('token', token);                          //Серверден JWT токен алады  ,  Токенді localStorage ішіне сақтайды
      close();                                                      // Модаль терезені жабу
      window.location.reload();                                    // Қайта жүктеу арқылы қолданбаның жаңартылуы
    })
   }


   // Егер isRegistration == true болса → Тіркелу формасын көрсету
   if (isRegistration) {
    return (
    <form className='bg-white flex flex-col gap-6 w-[400px] p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-sm:w-[300px]' onSubmit={register}>
         <h1 className='text-2xl font-bold text-center'>Тіркелу формасы</h1>
         {/* Әрбір input — деректі күйге(state) сақтайды */}
         <input value={registerData.first_name} onChange={(e) => setRegisterData({...registerData, first_name: e.target.value})} type="text" className='outline-0' placeholder='Атыңыз' />
         <input value={registerData.last_name} onChange={(e) => setRegisterData({...registerData, last_name: e.target.value})} type="text" className='outline-0' placeholder='Фамилияңыз' />
         <input value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} className='outline-0' type="email" placeholder='Электрондық пошта' />
         <input value={registerData.address} onChange={(e) => setRegisterData({...registerData, address: e.target.value})} className='outline-0' type="address" placeholder='Мекен-жайыңыз' />
         <input value={registerData.phone_number} onChange={(e) => setRegisterData({...registerData, phone_number: e.target.value})} className='outline-0' type="phone_number" placeholder='Телефон нөміріңіз' />
         <input value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} className='outline-0' type="password" placeholder='Құпия сөз' />
         <button className='bg-blue-700 text-white font-bold rounded cursor-pointer py-2' type='submit'>Тіркелу</button>
         {/* Кіру формасына ауысу */}
         <p className='text-center underline text-blue-300' onClick={() => setIsRegistration(false)}>Менде аккаунт бар</p>
    </form>
    )
    //  Егер isRegistration == false болса → Кіру формасын көрсету
  } else {
    return (
    <form className='bg-white flex flex-col gap-6 w-[400px] p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-sm:w-[300px]' onSubmit={login}>
         <h1 className='text-2xl font-bold text-center'>Кіру формасы</h1>
         <input value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className='outline-0' type="email" placeholder='Электрондық пошта' />
         <input value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className='outline-0' type="password" placeholder='Құпия сөз' />
         <button className='bg-blue-700 text-white font-bold rounded cursor-pointer py-2' type='submit'>Кіру</button>
         {/* Тіркелу формасына ауысу */}
         <p className=' underline text-blue-300 text-center' onClick={() => setIsRegistration(true)}>Менде аккаунт жоқ</p>
    </form>
    )
  }
}

export default Auth