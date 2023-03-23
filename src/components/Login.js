// pages/login.js

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useState } from "react";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const switchOption = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <>
      {isLoginPage ? <LoginPage /> : <RegisterPage />}
      <button onClick={switchOption}>
        {isLoginPage ? "Go to Register" : "Go to Login"}
      </button>
    </>
  );
}
