import TopBarComponent from "@/components/TopBarComponent";
import ProductCarousel from "@/components/productComponents/ProductCarousel";
import React from "react";
import PriceCard from "@/components/productComponents/PriceCard";
import SellerCard from "@/components/productComponents/SellerCard";
import ProductDescription from "@/components/productComponents/ProductDescription";

const ProductPageById = async ({ params }) => {
  // mengambil data dari API
  const response = await fetch(
    `http://localhost:3000/api/product/${params.id}`,
    { cache: "no-store" }
  );
  const produk = await response.json();

  return (
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
  );
};

export default ProductPageById;
