import React from "react";
import ShareProductButton from "./ShareProductButton";

const ProductDescription = ({ produk }) => {
  return (
    <div className="mx-10 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold leading-5 text-[#2E5F9E]">
          Deskripsi Produk
        </h1>
        <ShareProductButton />
      </div>

      <hr className="border-t-4 border-gray-300 mt-3 mb-3" />
      <div>
        <p className="font-normal text-base leading-6 text-[#71717A] text-justify">
          {produk.data?.description_product}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
