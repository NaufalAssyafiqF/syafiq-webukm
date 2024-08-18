"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";

const UserAvatar = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // handling untuk logout dari akun
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  }

  const handleNavugation = () => {
    router.push("/my-profile");
  }

  return (
    <div className="flex gap-x-4">
      <div className="flex items-center gap-x-3 relative">
        <img
          src={userData.data?.image}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center gap-x-2"
        >
          <h1>{userData.data?.username}</h1>
          <FaAngleDown />
        </button>

        {isOpen && (
          <ul className="absolute bg-white shadow-md top-full right-0 mt-2 py-2 rounded-md z-10">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-x-2" onClick={handleNavugation}>
              <FaRegUser /> <p>Profil Saya</p>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-x-2 text-red-600" onClick={handleLogout}>
              <IoMdExit className="scale-125"/> <p>Logout</p>
            </li>
          </ul>
        )}
      </div>
      <Link href="/sell-product">
        <button className="bg-[#F98930] px-6 py-1 rounded-md text-white hover:bg-[#ff8e32]">
          Jual +
        </button>
      </Link>
    </div>
  );
};

export default UserAvatar;
