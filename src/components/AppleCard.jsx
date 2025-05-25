import React from 'react'
import { Link } from 'react-router-dom'


function AppleCard({ apple }) {
  return (
    <div className='flex flex-col gap-6 p-4 shadow-2xl'>
        <img className='w-1/2 self-center' src={apple.img} alt="" />

        <Link to={`/apples/${apple.id}`}>
            <h3 className='hover:underline font-bold text-xl  text-blue-950 text-center'>{apple.title}</h3>
        </Link>
        
        <div className='flex justify-around'>
            <p className='font-medium'>{apple.color}</p>
        <p className='text-blue-900 font-medium'>{apple.price} ₸</p>
        </div>
        
        <button className='bg-blue-400 text-white p-2 rounded font-bold cursor-pointer'>Себетке қосу</button>
    </div>
  )
}

export default AppleCard