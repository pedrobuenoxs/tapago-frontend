import React from "react";
import styles from "./UserProfile.module.css";
import Image from "next/image";

function UserProfile({ user }) {
  const { name, age, email, weight, height, avatarUrl } = user;

  const myLoader = ({ avatarUrl }) => {
    return avatarUrl;
  };

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Image alt="avatar" src={avatarUrl} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.info}>
        <div className={styles.item}>
          <div className={styles.label}>Idade:</div>
          <div className={styles.value}>{age}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Email:</div>
          <div className={styles.value}>{email}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Peso:</div>
          <div className={styles.value}>{weight}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Altura:</div>
          <div className={styles.value}>{height}</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
