import React from "react";

import ProfileHeader from "@/components/ProfileHeader";

import { useAuth } from "../contexts/AuthProvider";
export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <ProfileHeader
        avatar={user.imageUrl}
        name={user.name}
        email={user.email}
        job={user.job}
      />
    </>
  );
}
