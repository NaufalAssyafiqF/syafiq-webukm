"use client";
import FooterComponent from "@/components/FooterComponent";
import CardProduct from "@/components/HomeComponents/CardProduct";
import TopBarComponent from "@/components/TopBarComponent";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchProductPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [dataProduct, setDataProduct] = useState([]);


  useEffect(() => {
    if (!search) return;
    // mengambil semua data product dari API berdasarkan query search
    const getFetchData = async () => {
      const response = await axios.get(`/api/search-product?search=${search}`,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = response.data
      setDataProduct(result);
    };

    getFetchData();
  }, [search]);

  
  if (!dataProduct) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <TopBarComponent />
      <div className="px-10 py-4 mt-10 bg-white mx-10 rounded-md flex-grow">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
            Hasil pencarian {search}
          </h1>
        </div>

        <div className="flex flex-wrap gap-x-4 justify-start">
          {dataProduct.data?.map((product) => (
            <CardProduct dataProduk={product} key={product.id} />
          ))}
          {!dataProduct.isSearched && (
            <p className="text-center text-gray-500 text-lg">
              Produk tidak ditemukan
            </p>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default SearchProductPage;
