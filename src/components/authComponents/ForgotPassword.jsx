"use client";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  // handling submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    const formData = new FormData(event.target);
    const email = formData.get("email");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessageError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[538px] h-[461px] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col gap-y-[12px]">
          <h1 className="text-center font-bold text-[#3C6EBC] text-2xl">
            Forgot Password
          </h1>
          <h1 className="text-xl font-normal leading-tight tracking-tight text-[#71717A] md:text-xs dark:text-white text-center ">
            Enter your registered email to reset your password
          </h1>
        </div>

        <form
          className="space-y-4 md:space-y-6"
          action="#"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter your email"
              required=""
            />
            {messageError && (
              <p className="text-red-500 text-sm mt-1">{messageError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-[#2E5F9E] hover:bg-[#1e3d66] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Send Link"}
          </button>
          {message && (
            <p className="text-blue-500 text-sm mt-1 text-center">{message}</p>
          )}
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

export default ForgotPassword;
