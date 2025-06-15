import { useEffect, useState } from 'react'
import AppleIcon from '@mui/icons-material/Apple';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AppleCard from './components/AppleCard';
import axios from 'axios';

import './App.css'

function App({ cartIds, setCartIds }) {

  const [apples, setApples] = useState([]);
  
  useEffect(() => {
    axios.get("${import.meta.env.VITE_API_BASE_URL}/phones")
    .then(res => setApples(res.data))
    .catch(err => alert(err.message));
  }, []);

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
            apples.map(apple => <AppleCard key={apple.phone_id} apple={apple} cartIds={cartIds} setCartIds={setCartIds} />)
          }
        </div>
      </div>
    </>
  )
}

export default App
