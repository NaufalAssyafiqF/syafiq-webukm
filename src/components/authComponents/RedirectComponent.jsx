"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectComponent = ({text1, text2, imageInfo}) => {
  const [countdown, setCountdown] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        router.push("/login");
      }
    }, 1000);

    return () => clearInterval(timer); // Bersihkan interval saat komponen unmount
  }, [countdown, router]);

  return (
    <div className=" text-center">
      <img src={imageInfo} alt="" className="mx-auto" />
      <div className="flex flex-col gap-y-[12px] mt-4">
        <h1 className="text-center font-bold text-[#3C6EBC] text-2xl">
          {text1}
        </h1>
        <p className="font-normal text-[#71717A]">
          {text2}
        </p>
        <p>
          You will be redirected to the Sign In page in{" "}
          <span className="text-[#3C6EBC]">{countdown}</span> seconds
        </p>
      </div>
    </div>
  );
};

export default RedirectComponent;
