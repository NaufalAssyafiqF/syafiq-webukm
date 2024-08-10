"use client";
import ProfileComponent from "@/components/ProfileComponent";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfilePage = () => {
  const [getData, setGetData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      console.log(token);
      
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/my-profile", {
        method: "GET",
        next: { revalidate: 10 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok){
        setGetData(result);
      }else {
        console.error("gagal mengambil data pengguna");
      }
      
    };

    fetchData();
  }, [router]);


  if (!getData) {
    return <div></div>; // atau Anda bisa menampilkan spinner/loading indicator
  }
  return (
    <ProfileComponent getData={getData} myProfile={true}/>
  );
};

export default MyProfilePage;
