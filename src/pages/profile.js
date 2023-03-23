import React, { useEffect, useState } from "react";

import ProfileHeader from "@/components/ProfileHeader";
import Stats from "@/components/Stats";

export default function Profile() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <>
      <ProfileHeader name={data.name} avatarUrl={"https://picsum.photos/200"} />
      <Stats data={data} />
    </>
  );
}
