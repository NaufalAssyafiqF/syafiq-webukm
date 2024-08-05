"use client";
import NewPassword from "@/components/authComponents/NewPassword";
import RedirectComponent from "@/components/authComponents/RedirectComponent";
import React, { useState } from "react";

const NewPasswordPage = () => {
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const handleUpdatePassword = () => {
    setIsPasswordUpdated(true);
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
        {isPasswordUpdated ? (
          <RedirectComponent
            text1={"Congrats, Your Password Updated"}
            text2={"You password has been updated, now you can sign in"}
            imageInfo={"/images/updated-icon.png"}
          />
        ) : (
          <NewPassword handleUpdatePassword={handleUpdatePassword} />
        )}
      </div>
    </div>
  );
};

export default NewPasswordPage;
