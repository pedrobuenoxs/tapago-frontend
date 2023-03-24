// pages/login.js

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useState } from "react";
import styles from "../components/AuthModal.module.css";
export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const switchOption = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className={styles.modal}>
      <h1>Ta pago 🦾</h1>
      {isLoginPage ? (
        <LoginPage setIsLoginPage={setIsLoginPage} />
      ) : (
        <RegisterPage />
      )}
    </div>
  );
}
