"use client";
import TopBarComponent from "@/components/TopBarComponent";
import ProductCarousel from "@/components/productComponents/ProductCarousel";
import React, { useEffect, useState } from "react";
import PriceCard from "@/components/productComponents/PriceCard";
import SellerCard from "@/components/productComponents/SellerCard";
import ProductDescription from "@/components/productComponents/ProductDescription";
import axios from "axios";

const ProductPageById = ({ params }) => {
  const [produk, setProduk] = useState(null);

  useEffect(() => {
    const getFetchData = async () => {
      const response = await axios.get(`/api/product/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;

      setProduk(result);
    }

    getFetchData();
  }, []);

  return (
    <>
      {!produk ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="bg-slate-100">
          <TopBarComponent />
          <div className=" flex mt-10 mx-10">
            <ProductCarousel produk={produk} />
            <div className="w-1/3 flex flex-col justify-between">
              <PriceCard produk={produk} />
              <SellerCard produk={produk} />
            </div>
          </div>
          <ProductDescription produk={produk} />
          <div className="h-12 w-full bg-[#3C6EBC] flex items-center justify-center mt-60">
            <p className="text-xs text-white">
              © Web UKM 2024 All Rights Reserved by Goritmix
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPageById;
