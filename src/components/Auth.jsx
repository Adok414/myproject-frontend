import React from 'react'

function Auth({ close }) {

   function submit(e) {
      e.preventDefault();
      close();
   }

  return (
    <form className='bg-white flex flex-col gap-6 w-[400px] p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-sm:w-[300px]' onSubmit={submit}>
         <h1 className='text-2xl font-bold text-center'>Тіркелу формасы</h1>
         <input className='outline-0' type="email" placeholder='Почтаңызды жазыңыз' />
         <input className='outline-0' type="password" placeholder='Құпия сөзді жазыңыз' />
         <button className='bg-blue-700 text-white font-bold rounded cursor-pointer py-2' type='submit'>Тіркелу</button>
    </form>
  )
}

export default Auth