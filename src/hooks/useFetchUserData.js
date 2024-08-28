import { useState, useEffect } from "react";
import { getUserById } from "@/services/getUserById";

const useFetchUserData = (token, userId) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && userId) {
        try {
          const data = await getUserById(userId, token);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [token, userId]);

  return { userData, setUserData, isLoading };
};

export default useFetchUserData;
