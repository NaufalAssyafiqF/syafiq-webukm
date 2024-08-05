"use client";
import RedirectComponent from "@/components/authComponents/RedirectComponent";
import RegisterForm from "@/components/authComponents/RegisterForm";
import React, { useState } from "react";

const RegisterPage = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleFormSubmit = () => {
    setIsAccountCreated(true);
  };
  return (
    <div className="w-screen h-screen flex bg-radial-gradient">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-[534px] flex flex-col justify-center items-center">
          <img src="/images/logo-login.png" alt="logo-ukm" />
          <img src="/images/partnership-amico-1.png" alt="partnership-image" />
        </div>
      </div>
      <div className="w-[682px] bg-[#FFFFFF] rounded-s-[40px] flex justify-center items-center">
        {isAccountCreated ? (
          <RedirectComponent
            text1={"Congrats, Your Account Is Created"}
            text2={"You successfully created an account, now you can Sign In"}
            imageInfo={"/images/created-icon.png"}
          />
        ) : (
          <RegisterForm onFormSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
