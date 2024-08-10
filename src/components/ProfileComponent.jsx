import React from 'react'
import {
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaUserEdit,
} from "react-icons/fa";
import FooterComponent from "@/components/FooterComponent";
import CardProduct from "@/components/HomeComponents/CardProduct";
import TopBarComponent from "@/components/TopBarComponent";
import Link from 'next/link';

const ProfileComponent = ({getData, myProfile}) => {
  return (
    <div className="bg-slate-100">
      <TopBarComponent />
      <div className="flex mx-10">
        <div className="w-[25%] sticky top-0">
          <div className="w-[90%] p-4 bg-white mt-5 rounded shadow-md">
            <h1 className="text-xl font-semibold text-blue-600 mb-2">
              Profil Toko
            </h1>
            <div>
              <img
                className="mb-2 w-full h-[270px] rounded"
                src={getData.dataUser?.user_img}
                alt=""
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              {getData.dataUser?.username}
            </h2>
            <p className="text-base font-medium mb-2">
              toko penjualan alat elektronik bekas dan baru terbaik di daerah
              bogor. barang banrang terjamin dan prosesnya cepat
            </p>
            <hr className="mb-4" />
            <table className="">
              <tbody>
                <tr className="">
                  <td className="pr-3">
                    <FaPhone className="" />
                  </td>
                  <td>081233344455</td>
                </tr>
                <tr>
                  <td className="pr-3">
                    <FaMapMarkerAlt className="" />
                  </td>
                  <td>Perumahan Pondok Citeureup Indah Blok C11 No1</td>
                </tr>
                <tr>
                  <td className="pr-3">
                    <FaCity className="" />
                  </td>
                  <td>{getData.dataUser?.alamat}</td>
                </tr>
              </tbody>
            </table>
            <h1 className="text-lg font-semibold text-blue-600 mt-5">
              Media Sosial
            </h1>
            <div>
              <div className="bg-[#2E5F9E] text-white py-2 rounded-lg text-center w-full hover:bg-[#44699a] mt-3">
                <FaFacebook className="inline-block mr-2 text-2xl" />
              </div>
              <div className="bg-[#25d366] text-white py-2 rounded-lg text-center w-full hover:bg-[#2cf575] mt-3">
                <FaWhatsapp className="inline-block mr-2 text-2xl" />
              </div>
              <div className="bg-[#DD2A7B] text-white py-2 rounded-lg text-center w-full hover:bg-[#f73089] mt-3">
                <FaInstagram className="inline-block mr-2 text-2xl" />
              </div>
            </div>
            {myProfile && (<hr className="mt-6 "/>)}
            {myProfile && (
              <Link href="/edit-profile">
                <div className="bg-[#2E5F9E] text-white py-2 rounded-lg text-center w-full hover:bg-[#44699a] mt-4">
                  <FaUserEdit className="inline-block mr-2 text-2xl" /> Edit
                  Profil
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="w-[75%] mt-5 bg-white p-4 rounded shadow-md">
          <h1 className="text-xl font-semibold text-blue-600 mb-2">
            Produk Toko
          </h1>
          <div className=" grid gap-3 grid-cols-3">
            {getData?.data.map((product, index) => (
              <CardProduct key={index} dataProduk={product} />
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default ProfileComponent