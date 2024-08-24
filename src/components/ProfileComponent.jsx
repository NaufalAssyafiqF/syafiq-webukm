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
  const message = `Halo ${getData.dataUser?.username} \n saya ingin bertanya tanya terkait toko anda \n http://www.web-ukm.com/user-profile/${getData.dataUser?.user_id}`;
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
                className="mb-2 w-full aspect-square rounded"
                src={getData.dataUser?.user_img}
                alt=""
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              {getData.dataUser?.username}
            </h2>
            <p className="text-base font-medium mb-2">
              {getData.dataUser?.deskripsi
                ? getData.dataUser?.deskripsi
                : "Tidak ada deskripsi"}
            </p>
            <hr className="mb-4" />
            <table className="">
              <tbody>
                <tr className="">
                  <td className="pr-3">
                    <FaPhone className="" />
                  </td>
                  <td>
                    {getData.dataUser?.phone_number
                      ? getData.dataUser?.phone_number
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="pr-3">
                    <FaMapMarkerAlt className="" />
                  </td>
                  <td>
                    {getData.dataUser?.alamat ? getData.dataUser?.alamat : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="pr-3">
                    <FaCity className="" />
                  </td>
                  <td>
                    {getData.dataUser?.kota ? getData.dataUser?.kota : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
            <h1 className="text-lg font-semibold text-blue-600 mt-5">
              Media Sosial
            </h1>
            <div>
              <Link
                href={
                  getData.dataUser?.fb_link ? getData.dataUser?.fb_link : "#"
                }
              >
                <div className="bg-[#2E5F9E] text-white py-2 rounded-lg text-center w-full hover:bg-[#44699a] mt-3">
                  <FaFacebook className="inline-block mr-2 text-2xl" />
                </div>
              </Link>

              <Link
                href={
                  getData.dataUser?.wa_link
                    ? `https://wa.me/${
                        getData.dataUser?.wa_link
                      }?text=${encodeURIComponent(message)}`
                    : "#"
                }
              >
                <div className="bg-[#25d366] text-white py-2 rounded-lg text-center w-full hover:bg-[#2cf575] mt-3">
                  <FaWhatsapp className="inline-block mr-2 text-2xl" />
                </div>
              </Link>

              <Link
                href={
                  getData.dataUser?.fb_link ? getData.dataUser?.ig_link : "#"
                }
              >
                <div className="bg-[#DD2A7B] text-white py-2 rounded-lg text-center w-full hover:bg-[#f73089] mt-3">
                  <FaInstagram className="inline-block mr-2 text-2xl" />
                </div>
              </Link>
            </div>
            {myProfile && <hr className="mt-6 " />}
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
          {getData.data?.length === 0 ? (
            <div className="flex justify-center items-center w-full h-[400px]">
              <h1 className="text-gray-500 text-lg">
                Toko belum memiliki produk
              </h1>
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-4 justify-start">
              {getData.data?.map((product, index) => (
                <CardProduct key={index} dataProduk={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default ProfileComponent