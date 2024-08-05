import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { GrMap } from "react-icons/gr";

const SellerCard = ({ produk }) => {
  return (
    <div className="bg-white p-5 h-[149px] rounded-xl">
      <div className="flex flex-col item-center">
        <div className="flex items-center">
          <img
            src={produk.dataUser?.user_img}
            alt=""
            className="w-[44px] h-[44px] rounded-full"
          />
          <div className="ms-3">
            <h1 className="text-[#2E5F9E] font-semibold text-lg">
              {produk.dataUser?.username}
            </h1>
            <h1 className="text-[#52525B]">
              <GrMap className="inline-block text-xl" />{" "}
              {produk.dataUser?.alamat}
            </h1>
          </div>
        </div>
        <button className="w-full border border-[#2E5F9E] text-[#2E5F9E] text-base rounded-lg py-2 px-4 mt-3 hover:bg-[#2E5F9E] hover:text-white group">
          Kunjungi Toko{" "}
          <FaChevronRight className="inline text-xs group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
