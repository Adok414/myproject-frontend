import React from 'react'

function AppleDetails() {

   const apple = {
    id: 1,
    img: "https://gadgetstore.kz/wa-data/public/shop/products/76/10/1076/images/2918/2918.970.jpg", 
    title: "iPhone 16pro",
    color: "Black",
    price: 629990,
    year: 2025,
    discription: "iPhone 16 Pro 6,3 дюймдік Super Retina XDR OLED дисплейін ұсынады, ал iPhone 16 Pro Max үлкенірек 6,9 дюймдік дисплейді ұсынады. Екі модель де шетінен шетке дисплей дизайнын жалғастырады, бірақ жиектері жұқа, бұл оларды «бүгінгі күнге дейін ең жұқа iPhone» етеді. Pro үлгілері жеңіл, сызатқа төзімді құрылымды ұсынатын ақ титан, шөл титан, табиғи титан және қара титан әрлеуінде қол жетімді.",
  }


  return (
    <div className='flex py-10 px-16 max-md:flex-col max-sm:flex-col'>
      <img className='w-1/4 max-sm:w-xl' src={apple.img} alt="" />
      <div className='space-y-2 flex flex-col justify-center'>
        <h1 className='text-3xl font-bold text-blue-950 max-sm:self-center'>{apple.title}</h1>
        <p className='text-xl max-sm:self-center'>{apple.color}</p>
        <p className='text-xl font-medium max-sm:self-center'>{apple.year}</p>
        <p>{apple.discription}</p>
        <div className='flex gap-16 items-center'>
          <p className='font-medium text-red-900 text-2xl'>{apple.price} ₸</p>
          <button className='bg-blue-900 text-white p-2 rounded cursor-pointer'> Себетке қосу </button>
        </div>
        
        
      </div>
    </div>
  )
}

export default AppleDetails