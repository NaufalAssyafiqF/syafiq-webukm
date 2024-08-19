"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // handling submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // mengambil data dari API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        // menyimpan token pada session storage
        sessionStorage.setItem("token", result.token); 

        router.push("/");
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

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="w-[538px] h-[461px] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col gap-y-[12px]">
          <h1 className="text-center font-bold text-[#3C6EBC] text-2xl">
            Sign In
          </h1>
          <h1 class="text-xl font-normal leading-tight tracking-tight text-[#71717A] md:text-xs dark:text-white text-center ">
            Sign in to your account
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
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
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
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start"></div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#2E5F9E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-[#2E5F9E] hover:bg-[#1e3d66] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-sm font-light text-center text-[#71717A]">
            Don’t have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-[#2E5F9E] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm