"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const   
 [email, setEmail] = useState(null);
  const [tokenExpirationTimeout, setTokenExpirationTimeout] = useState(null);
  const router = useRouter();

  const logout = () => {
    // Clear the token expiration timeout
    if (tokenExpirationTimeout) {
      clearTimeout(tokenExpirationTimeout);
    }

    // Remove the user data and token from local storage
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("account_id");
    localStorage.removeItem("user_id");
    router.push("/");
    router.refresh();
  };

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(userData));

    // Set the token expiration timeout
    setTokenExpiration(15 * 60 * 1000); // 15 minutes
    router.refresh();
  };

  const setTokenExpiration = (timeout) => {
    if (tokenExpirationTimeout) {
      clearTimeout(tokenExpirationTimeout);
    }

    const newTimeout = setTimeout(() => {
      logout(); // Log the user out if the token has expired
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
        // Set the token expiration timeout
        setTokenExpiration(15 * 60 * 1000); // 15 minutes
      } catch (e) {
        console.error("Error parsing saved user:", e);
        logout();
      }
    }
  }, [token, user]);

  useEffect(() => {
    // Check if the token has expired and log the user out if it has
    if (token && tokenExpirationTimeout) {
      const now = new Date().getTime();
      const expirationTime = tokenExpirationTimeout + now;
      if (now > expirationTime) {
        logout();
      }
    }
  }, [token, tokenExpirationTimeout]);

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
