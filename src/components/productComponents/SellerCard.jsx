import Link from "next/link";
import React from "react";
import { FaChevronRight, FaCity } from "react-icons/fa";
import { GrMap } from "react-icons/gr";

const SellerCard = ({ produk }) => {
  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="flex flex-col justify-center">
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
          </div>
        </div>
        <div className="text-[#52525B] ps-3 my-2">
          <table>
            <tbody>
              <tr>
                <td className="pe-2">
                  <GrMap className="inline-block text-xl" />
                </td>
                <td>{produk.dataUser?.alamat}</td>
              </tr>
              <tr>
                <td className="pe-2">
                  <FaCity className="inline-block text-xl" />
                </td>
                <td>{produk.dataUser?.kota}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link
          href={`/user-profile/${produk.dataUser?.user_id}`}
          className="w-full border border-[#2E5F9E] text-[#2E5F9E] text-base rounded-lg py-2 px-4  hover:bg-[#2E5F9E] hover:text-white group "
        >
          Kunjungi Toko{" "}
          <FaChevronRight className="inline text-xs group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
};

export default SellerCard;
