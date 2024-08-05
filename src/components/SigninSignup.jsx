import React from 'react'

const SigninSignup = () => {
  return (
    <div className="flex space-x-4 gap-x-3">
      <a href="/register">
        <button className="bg-[#CFE4FF] hover:bg-[#2E5F9E] text-[#002E69] hover:text-white font-bold py-2 px-6 rounded-lg">
          Sign Up
        </button>
      </a>

      <a href="/login">
        <button className="bg-[#2E5F9E] hover:bg-[#CFE4FF] text-white font-semibold hover:text-[#002E69] py-2 px-6 rounded-lg">
          Sign In
        </button>
      </a>
    </div>
  );
}

export default SigninSignup