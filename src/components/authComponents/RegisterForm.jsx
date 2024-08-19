"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const RegisterForm = ({ onFormSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("password");

    formData.append("email", event.target.email.value);
    formData.append("username", username);
    formData.append("password", newPassword);

    // setPasswordsMatch(newPassword === confirmPassword);

    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
          {
            method: "POST",
            body: formData,
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify({
            //   email: email,
            //   username: username,
            //   password: newPassword,
            // }),
          }
        );
        const result = await response.json();

        if (response.ok) {
          onFormSubmit();
        } else {
          console.error(result.error);
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setErrorMessage(result.message);
      } finally {
        setLoading(false);
      }
    } else {
      setPasswordsMatch(false);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="w-[538px] h-[461px] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col gap-y-[12px]">
          <h1 className="text-center font-bold text-[#3C6EBC] text-2xl">
            Create New Account
          </h1>
        </div>

        <form
          className="space-y-4 md:space-y-4"
          action="#"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your Username"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your password"
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
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your confirm password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                // onChange={() => setPasswordsMatch(true)}
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
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-[#2E5F9E] hover:bg-[#1e3d66] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
          <p className="text-sm font-light text-center text-[#71717A]">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#2E5F9E] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
