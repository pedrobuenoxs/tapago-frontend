// contexts/AuthProvider.js

import { createContext, useContext, useState, useEffect } from "react";
import nookies, { parseCookies } from "nookies";
import axios from "axios";
import Router from "next/router";

import { api } from "@/service/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    api
      .get("/auth/protected")
      .then((response) => {
        setAuth(true);
        console.log(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const response = await api.post("/auth/login", {
      user: {
        email,
        password,
      },
    });

    const { token, user } = response.data;
    setAuth(true);
    nookies.set(undefined, "token-tapago", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    setUser(user);
    Router.push("/");
    setLoading(false);
  };

  const register = async ({ email, password, number }) => {
    setLoading(true);
    const response = await api.post("/auth/register", {
      user: {
        email,
        password,
        number,
      },
    });

    const { token, user } = response.data;
    setAuth(true);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    nookies.set(undefined, "token-tapago", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    setUser(user);
    Router.push("/");
    setLoading(false);
  };

  const logout = () => {
    nookies.destroy(null, "token-tapago");
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, auth, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
