import React from "react";
import ProfileComponent from "@/components/ProfileComponent";

// mengambil data dari API
const getFectdata = async (params) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile/${params.id}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await response.json();
  return data;
};

const UserProfilePage = async ({ params }) => {
  const getData = await getFectdata(params);

  return <ProfileComponent getData={getData} myProfile={false}/>;
};

export default UserProfilePage;
