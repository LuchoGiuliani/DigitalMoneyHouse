"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "@/services/getUserById";
import { useAuth } from "@/hooks/useAuth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accountData, setAccountData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const user_id = JSON.parse(window.localStorage.getItem("user_id"));

      if (user_id && token) {
        try {
          const data = await getUserById(user_id, token);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      setIsLoading(false);
    };
    
    fetchUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, isLoading, setUserData, accountData, setAccountData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
