import React from 'react'
import { GrMap } from 'react-icons/gr';

const CardProduct = ({dataProduk}) => {
  
  return (
    <div className="w-72 h-[450px] bg-white rounded-md py-3 mb-5 flex flex-col justify-between border-2">
      <div className="flex px-2 mb-2">
        <img
          src={dataProduk.user.user_img}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <div className="ms-2">
          <h1 className="text-[#3F3F46] text-sm">{dataProduk.user.username}</h1>
          <p className="text-[#71717A] text-xs">1 Hari Yang Lalu</p>
        </div>
      </div>
      <div className='border-y py-2'>
        <img
          src={dataProduk.image_urls[0].image_url}
          alt=""
          className="w-72 h-72 object-contain"
        />
      </div>
      <div className="px-2 flex flex-col gap-y-1">
        <h1 className="text-[#71717A] text-sm">{dataProduk.name_product}</h1>
        <h2 className="font-semibold">RP. {dataProduk.price_product}</h2>
        <div className="flex items-center text-xs text-[#3F3F46]">
          <GrMap className="inline-block text-xl" />
          <p>{dataProduk.user.alamat}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProduct