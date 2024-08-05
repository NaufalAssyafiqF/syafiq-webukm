import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

const PriceCard = ({produk}) => {
  return (
    <div className="bg-white py-5 px-5 h-[239px] flex flex-col justify-center rounded-xl">
      <div className="">
        <h1 className="font-bold text-3xl leading-8">Rp. 12.000.000</h1>
        <h2 className="font-medium text-xl">Iphone 11 Ibox Fullset</h2>
        <table className="font-normal text-base text-[#52525B] my-2">
          <tbody>
            <tr>
              <td>kondisi</td>
              <td>:</td>
              <td>{produk.data?.condition}</td>
            </tr>
            <tr>
              <td>merek</td>
              <td>:</td>
              <td>{produk.data?.brend}</td>
            </tr>
          </tbody>
        </table>
        <button className="bg-[#2E5F9E] text-white py-2 rounded-lg text-center w-full hover:bg-[#44699a]">
          <FaWhatsapp className="inline-block mr-2 text-2xl" /> Hubungi Penjual
        </button>
      </div>
    </div>
  );
}

export default PriceCard