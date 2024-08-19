"use client";
import { useState, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyToken } from "@/libs/jwt";
import { prisma } from "@prisma/client";
// import prisma from "@/libs/prisma";

const NewPassword = ({ handleUpdatePassword }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  // membaut handling untuk hide password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  // membuat handling submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    // validasi password tidak sama
    setPasswordsMatch(newPassword === confirmPassword);

    if (newPassword === confirmPassword) {
      try {
        // mengambil data dari API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password/new-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userData?.data.email,
              password: newPassword,
              token: resetToken,
            }),
          }
        );
        const result = await response.json();

        if (response.ok) {
          handleUpdatePassword();
        } else {
          console.error(result.error);
          setMessageError(result.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setMessageError(error.message);
      } finally {
        setLoading(false)
      }
    } else {
      setPasswordsMatch(false)
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      
      if (!resetToken) {
        // setIsLoading(false); // Tidak ada token, tidak perlu fetch
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password/new-password`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${resetToken}`,
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          setUserData(result);
        } else {
          console.error("gagal mengambil data pengguna");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserData();
  }, []);

  return (
    <div class="w-[538px] h-[461px] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col gap-y-[12px]">
          <h1 className="text-center font-bold text-[#3C6EBC] text-2xl">
            Create New Password
          </h1>
        </div>

        <form
          className="space-y-4 md:space-y-4"
          action="#"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                readOnly
                value={userData?.data.email}
                className="bg-[#EEEEEE] border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your email"
                required=""
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaCheckCircle className="text-green-500" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              New Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your confirm new password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={togglePasswordVisibility2}
              >
                {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-[#2E5F9E] hover:bg-[#1e3d66] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Update Password"}
          </button>
          {messageError && <p className="text-red-500">{messageError}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
