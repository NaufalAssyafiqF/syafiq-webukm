"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import axios from "axios";

const ProductSection = () => {
  const [dataProduct, setDataProduct] = useState(null);
  console.log(dataProduct);
  

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const response = await axios.get("/api/homepage", {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          
        });
        console.log(response.data);
        
        // const shuffledData = response.data.sort(() => Math.random() - 0.5);
        setDataProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDataProduct();
  }, []);

  return (
    <div className="px-10 py-4 mt-10 bg-white mx-10 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
          Rekomendasi Produk & Jasa
        </h1>
      </div>

      {dataProduct ? (
        <div className="grid gap-4 grid-cols-4">
          {dataProduct.data?.map((product, index) => (
            <CardProduct dataProduk={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center w-full text-[#3C6EBC] font-semibold">
          Data sedang dimuat...
        </div>
      )}
    </div>
  );
};

export default ProductSection;
