"use client";
// import { cookies } from "next/headers";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import SigninSignup from "./SigninSignup";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";
import { startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


const TopBarComponent = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // handling untuk melakukan search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search-product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setIsLoading(false); // Tidak ada token, tidak perlu fetch
        return;
      }

      try {
        
        const response = await axios.get("/api/topBar/userAvatar", {
          headers: {
           " Authorization": `Bearer ${token}`,
          },
        });
        const result = response.data

        if (response.status == 200) {
          setUserData(result);
        } else {
          console.error("gagal mengambil data pengguna")
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="w-full h-[72px] flex justify-between items-center bg-white px-10">
      <Link href="/">
        <Image
          src="/images/logo-login.png"
          alt="Logo"
          width={177}
          height={44}
        />
      </Link>

      <div className="relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Cari Produk Yang Kamu Suka"
            className="w-[600px] pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </form>
      </div>

      {isLoading ? (
        <div className="w-20 h-2"></div>
      ) : userData && userData.isTokenVerified ? (
        <UserAvatar userData={userData} />
      ) : (
        <SigninSignup />
      )}
    </div>
  );
};

export default TopBarComponent;
