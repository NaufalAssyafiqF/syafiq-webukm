"use client";
import React, { useEffect, useState } from "react";
import ProfileComponent from "@/components/ProfileComponent";
import axios from "axios";


const UserProfilePage =  ({ params }) => {
  const [getData, setGetData] = useState(null);

  useEffect(() => {
    const getFectdata = async () => {
      const response = await axios.get(`/api/user-profile/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = response.data

      setGetData(result)
    }

    getFectdata();
  }, []);

  if (!getData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span class="loader"></span>
      </div>
    );
  }
  return <ProfileComponent getData={getData} myProfile={false}/>;
};

export default UserProfilePage;
