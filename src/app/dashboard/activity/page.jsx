"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Activity from "@/components/Activity/Activity";



const page = () => {
  const { token } = useAuth();
  const [accountData, setAccountData] = useState([]);
  const [accountActivity, setAccountActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log("accountData", accountData);
  console.log("accountActivity", accountActivity);

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token]);



  return (
    <main className="bg-color-gray min-h-screen">
      <section className="flex">
      
        <div className="p-10 w-full flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="bg-white w-full p-2 flex gap-2 rounded-lg drop-shadow-lg">
              <Image
                src={"/search.png"}
                width={12}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
              <h1 className="text-gray-400">Buscar en tu actividad</h1>
            </div>
            <button className="bg-color-primary p-2 rounded-lg drop-shadow-lg min-w-[164px] flex gap-2 items-center font-semibold">
              Filtrar
              <Image
                src={"/filter.png"}
                width={12}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
            </button>
          </div>
          <div className="w-full h-full bg-white rounded-lg drop-shadow-lg p-4">
            <h2 className="font-bold pb-6">Tu actividad</h2>
            <Activity             
              accountActivity={accountActivity}
              itemsPerPage={itemsPerPage}
              accountData={accountData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
