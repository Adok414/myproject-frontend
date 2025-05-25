import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

function Cart({ close }) {

  const apple = {
    id: 1,
    img: "https://gadgetstore.kz/wa-data/public/shop/products/76/10/1076/images/2918/2918.970.jpg", 
    title: "iPhone 16pro",
    color: "Black",
    price: 629990 
  }
  
  const apples = Array(6).fill(apple);

  return (
    <div className='bg-white h-screen w-auto flex flex-col absolute right-0 top-0 p-4 gap-4'>
        <div className='text-black flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-blue-500'>Себет</h1>
            <CancelIcon onClick={close} className='cursor-pointer'/>
        </div>
        <div className='flex flex-col gap-6 overflow-auto'>
            {
                apples.map(a =>(
                    <div className='min-w-[150px] flex gap-2'>
                        <img className='w-[100px]' src={a.img} alt="" />
                        <div>
                            <h3>{a.title}</h3>
                            <p>{a.color}</p>
                            <p>{a.price} ₸</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <button className='bg-blue-500 text-white rounded-lg cursor-pointer py-1.5'>Сатып алу</button>
    </div>
  )
}

export default Cart