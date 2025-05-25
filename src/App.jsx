import { useState } from 'react'
import AppleIcon from '@mui/icons-material/Apple';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AppleCard from './components/AppleCard';

import './App.css'

function App() {

  const apple = {
    id: 1,
    img: "https://gadgetstore.kz/wa-data/public/shop/products/76/10/1076/images/2918/2918.970.jpg", 
    title: "iPhone 16pro",
    color: "Black",
    price: 629990 
  }
  
  const apples = Array(12).fill(apple);

  return (
    <>
      <div className='py-8 px-16'>
        <div className='flex items-center justify-between'>
          <h1 className='text-6xl text-blue-950 font-semibold max-sm:text-3xl'>iPhone</h1>
          <div className='flex gap-4'>
            <AppleIcon className='text-blue-950 cursor-pointer' />
            <PhoneIphoneIcon className='cursor-pointer'/>
            <LaptopMacIcon className='cursor-pointer'/>
          </div>
        
        </div>
        
        <p className='mt-6 font-medium'>Біздің дүкендерде сіз iPhone, Mac компьютері немесе iPad планшетін ғана емес, сонымен қатар оған арналған басқа Apple жабдықтары мен керек-жарақтарын да сатып ала аласыз. AppleStore – бұл ең алдымен Apple дүкенінің атмосферасымен сусындаған орын, мұнда олар жабдықты таңдауға көмектеседі, оны қалай пайдалану керектігін үйретеді, гаджеттерді пайдалану бойынша кеңестер береді және жоғары сапалы аксессуарларды ұсынады.</p>
        
        <div className='grid grid-cols-6 gap-4 mt-10 max-md:grid-cols-2 max-sm:grid-cols-1 max-lg:grid-cols-4' >
          {
            apples.map(apple => <AppleCard apple={apple} />)
          }
        </div>
      </div>
    </>
  )
}

export default App
