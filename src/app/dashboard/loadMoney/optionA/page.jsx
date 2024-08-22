"use client"
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { useAuth } from "@/hooks/useAuth";
import getAccountDetail from "@/services/getUserAccount";
import { getUserById } from "@/services/getUserById";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";


const page = () => {

  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const { token, setToken } = useAuth();

  useEffect(() => {
    const fetchAccountData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      if (tokenFromStorage) {
        try {
          await getAccountDetail(setAccountData, tokenFromStorage);
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
    };

    fetchAccountData();
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      const userId = JSON.parse(window.localStorage.getItem("user_id"));
      if (tokenFromStorage && userId) {
        try {
          const data = await getUserById(userId, tokenFromStorage);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]); 

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        toast.success("Copiado al portapapeles!")
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        alert("Error al copiar!");
      });
  };

  return (
    <div className="flex">
        <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "bg-color-primary rounded-lg p-4 flex items-center gap-2",
            title: "text-black",
          },
        }}
        position="bottom-right"
      />
      <LeftSidebar />
      <div className="bg-color-gray w-full p-6">
        {accountData && (
          <article className="bg-color-darker text-white p-6 rounded-md drop-shadow-md flex flex-col gap-4">
            <h2 className="text-white">
              Copia tu CVU o alias para ingresar o transferir dinero desde otra
              cuenta
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-color-primary">CVU</h2>
                  <h3>{accountData.cvu}</h3>
                </div>
                <button
                  onClick={() => handleCopy(accountData.cvu)}
                  className=" text-white p-2 rounded"
                >
                  <Image
                    width={22}
                    height={22}
                    alt="iconoCopy"
                    src="/iconoCopy.png"
                    className="w-auto h-auto"
                  />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-color-primary">Alias</h2>
                  <h3>{accountData.alias}</h3>
                </div>
                <button
                  onClick={() => handleCopy(accountData.alias)}
                  className=" text-white p-2 rounded"
                >
                  <Image
                    width={22}
                    height={22}
                    alt="iconoCopy"
                    src="/iconoCopy.png"
                    className="w-auto h-auto"
                  />
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default page;
