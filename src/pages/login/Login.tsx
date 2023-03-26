import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { LoginFeature } from "@users/index";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div
      className={styles.login}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/login.jpg')`,
      }}
    >
      <LoginFeature />
    </div>
  );
}
