"use client";
import ProfileComponent from "@/components/ProfileComponent";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfilePage = () => {
  const [getData, setGetData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk mengambil data pengguna dari API
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-profile`,
        {
          method: "GET",
          next: { revalidate: 10 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok){
        setGetData(result);
      }else {
        console.error("gagal mengambil data pengguna");
      }
      
    };

    fetchData();
  }, [router]);


  // Jika data pengguna tidak ada, tampilkan loading indicator
  if (!getData) {
  return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span class="loader"></span>
      </div>
    ); // atau Anda bisa menampilkan spinner/loading indicator
  }
  return (
    <ProfileComponent getData={getData} myProfile={true}/>
  );
};

export default MyProfilePage;
