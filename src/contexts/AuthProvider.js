// contexts/AuthProvider.js

import { createContext, useContext, useState, useEffect } from "react";
import nookies, { parseCookies } from "nookies";
import Router from "next/router";

import { api } from "@/service/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/auth/protected")
      .then((response) => {
        setAuth(true);
        const user = response.data;
        setUser(user);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const editPerfil = async ({ name, file, id }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("avatar", file);
      }

      const response = await api.patch(`/user/profile/upload/${id}`, {
        body: formData,
      });

      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
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
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const register = async ({ email, password, number }) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        user: {
          email,
          password,
          number,
        },
      });
      const { token, user } = response.data;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      nookies.set(undefined, "token-tapago", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      setUser(user);
      setAuth(true);
      setLoading(false);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const logout = () => {
    nookies.destroy(null, "token-tapago");
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, auth, register, loading, editPerfil }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
