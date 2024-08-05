import ForgotPassword from '@/components/authComponents/ForgotPassword';
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className="w-screen h-screen flex bg-radial-gradient">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-[534px] flex flex-col justify-center items-center">
          <img src="/images/logo-login.png" alt="logo-ukm" />
          <img src="/images/partnership-amico-1.png" alt="partnership-image" />
        </div>
      </div>
      <div className="w-[682px] bg-[#FFFFFF] rounded-s-[40px] flex justify-center items-center">
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage