import React from 'react'
import CardProduct from './CardProduct';


const getDataProduct = async () => {
  const response = await fetch(`http://localhost:3000/api/homepage`, {
        next: { revalidate: 10 },
      });
  const res = await response.json()
  return res
}

const ProductSection = async () => {
  const dataProduct = await getDataProduct()
  
  return (
    <div className="px-10 py-4 mt-10 bg-white mx-10 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
          Rekomendasi Produk & Jasa
        </h1>
      </div>

      <div className="grid gap-4 grid-cols-4 grid-rows-4">
        {dataProduct.data?.map((product) => (
          <CardProduct dataProduk={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductSection