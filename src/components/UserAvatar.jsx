import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

const UserAvatar = ({ userData }) => {
  // console.log(userData.data?.image);
  // console.log(userData);
  return (
    <div className="flex gap-x-4">
      <div className="flex items-center gap-x-3">
        <img
          src={userData.data?.image}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <h1>{userData.data?.username}</h1>
        <FaAngleDown />
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
