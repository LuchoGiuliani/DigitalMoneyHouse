import { useState, useEffect } from "react";
import getAccountDetail from "@/services/getUserAccount";

const useFetchAccountData = (token) => {
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (token) {
        try {
          const data = await getAccountDetail(token);
          setAccountData(data);
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
      setIsLoading(false);
    };

    fetchAccountData();
  }, [token]);

  return { accountData, setAccountData, isLoading };
};

export default useFetchAccountData;