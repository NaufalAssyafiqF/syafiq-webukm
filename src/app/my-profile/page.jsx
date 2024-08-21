"use client";
import ProfileComponent from "@/components/ProfileComponent";
import axios from "axios";
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

      const response = await axios.get("/api/my-profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      if (response.status === 200) {
        setGetData(result);
      } else {
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
  return <ProfileComponent getData={getData} myProfile={true} />;
};

export default MyProfilePage;
