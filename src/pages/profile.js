import React, { useEffect, useState } from "react";

import ProfileHeader from "@/components/ProfileHeader";
import Stats from "@/components/Stats";

import { useAuth } from "../contexts/AuthProvider";
export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <ProfileHeader
        avatar={""}
        name={user.name}
        email={user.email}
        job={user.job}
      />
    </>
  );
}
