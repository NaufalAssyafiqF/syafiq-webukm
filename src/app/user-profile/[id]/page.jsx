import React from "react";
import ProfileComponent from "@/components/ProfileComponent";


const getFectdata = async (params) => {
  const response = await fetch(
    `http://localhost:3000/api/user-profile/${params.id}`,
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
