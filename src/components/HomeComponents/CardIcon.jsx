import React from 'react'

const CardIcon = ({icon, textIcon}) => {
  return (
    <div className="w-32 h-32 flex flex-col items-center">
      <div className="bg-white w-20 h-20 rounded-xl cursor-pointer">
        <img src={icon} alt="" />
      </div>
      <p className="text-[#52525B] text-sm text-center mt-2">{textIcon}</p>
    </div>
  );
}

export default CardIcon