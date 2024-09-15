"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "@/services/getUserById";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const [user_id, setUserId] = useState(null);
  const router = useRouter()
console.log("userData del useUser", userData);


  useEffect(() => {
    const fetchUserData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      const userId = JSON.parse(window.localStorage.getItem("user_id"));
      if (userId && tokenFromStorage) {
        try {
          const data = await getUserById(userId, tokenFromStorage);
          setUserData(data);
         
          router.refresh()
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, [token, user_id]);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        setUserData,
        accountData,
        setAccountData,
        setUserId,
        user_id,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
