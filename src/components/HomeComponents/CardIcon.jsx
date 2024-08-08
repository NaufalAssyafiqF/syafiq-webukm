"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const CardIcon = ({icon, textIcon}) => {
  const router = useRouter()
  const handleNavigation = () => {
    sessionStorage.setItem("filterProduct", textIcon); 
    router.push("/filter-product");
  }

  return (
    <div className="w-32 h-32 flex flex-col items-center" onClick={handleNavigation}>
      <div className="bg-white w-20 h-20 rounded-xl cursor-pointer">
        <img src={icon} alt="" />
      </div>
      <p className="text-[#52525B] text-sm text-center mt-2">{textIcon}</p>
    </div>
  );
}

export default CardIcon