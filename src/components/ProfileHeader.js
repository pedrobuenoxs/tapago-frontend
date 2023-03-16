import React from "react";
import styles from "./ProfileHeader.module.css";
import Image from "next/image";

function ProfileHeader({ name, avatarUrl }) {
  const coverStyle = getCoverGradient();

  return (
    <div className={styles.container}>
      <div
        className={styles.cover}
        style={{ backgroundImage: coverStyle.backgroundImage }}
      >
        {/* Add the wave effect to the cover here */}
      </div>
      <div className={styles.avatarContainer}>
        <Image
          className={styles.avatar}
          src={avatarUrl}
          alt={`${name}'s avatar`}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.name} style={{ color: coverStyle.color }}>
        {name}
      </div>
    </div>
  );
}

function getCoverGradient() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      backgroundImage:
        "linear-gradient(45deg, #ebf8e1 20%, #6fcbf2 80%, #6fcbf2 80%)",
      color: "black",
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      backgroundImage:
        "linear-gradient(45deg, #ebf8e1 20%, #f8883c 80%, #f8883c 80%)",
      color: "black",
    };
  } else {
    return {
      backgroundImage:
        "linear-gradient(45deg, #ebf8e1 20%, #130851 80%, #130851 80%)",
      color: "white",
    };
  }
}

export default ProfileHeader;
