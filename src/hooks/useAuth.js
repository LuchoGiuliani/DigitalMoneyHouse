"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [tokenExpirationTimeout, setTokenExpirationTimeout] = useState(null);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Limpiar el timeout de expiración del token si existe
    if (tokenExpirationTimeout) {
      clearTimeout(tokenExpirationTimeout);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(userData));

    // Establecer la expiración del token
    setTokenExpiration(15 * 60 * 1000); // 15 minutos
  };

  const setTokenExpiration = (timeout) => {
    if (tokenExpirationTimeout) {
      clearTimeout(tokenExpirationTimeout);
    }

    const newTimeout = setTimeout(() => {
      logout(); // Desloguear automáticamente
    }, timeout);

    setTokenExpirationTimeout(newTimeout);
  };

  useEffect(() => {
    const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
    const savedUser = localStorage.getItem("user");

    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser(parsedUser);
        }
        // Establecer la expiración del token
        setTokenExpiration(15 * 60 * 1000); // 15 minutos
      } catch (e) {
        console.error("Error parsing saved user:", e);
        logout();
      }
    }
  }, []);

  const isAuthenticated = () => {
    return !!token;
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      isAuthenticated,
      login,
      logout,
      email,
      setEmail,
    }),
    [user, token, email]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);