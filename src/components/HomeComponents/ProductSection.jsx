import React from 'react'
import CardProduct from './CardProduct';

const ProductSection = ({title}) => {
  return (
    <div className="px-10 mt-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
          {title}
        </h1>
        <p className="text-sm text-[#3C6EBC] underline">Lihat Semua &gt;</p>
      </div>

      <div className="flex justify-between">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </div>
  );
}

export default ProductSection