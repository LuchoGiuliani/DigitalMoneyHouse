"use client";
import Activity from "@/components/Activity/Activity";
import Filter from "@/components/Filter/Filter";
import SearchFormActivity from "@/components/SearchFormActivity/SearchFormActivity";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useActivity } from "@/context/activityContext";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const {
    setAccountActivity,
    setAccountData,
    setOriginalAccountActivity,
  } = useActivity();

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, (activities) => {
        setAccountActivity(activities);
        setOriginalAccountActivity(activities); // Guardamos las actividades originales
      }, token).finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <main className="bg-color-gray min-h-screen text-[18px] tablet-[12px]">
      <section className="flex">
        <div className="px-6 py-6 tablet:px-[79px] tablet:py-[40px] w-full flex flex-col gap-4">
          <div className="flex gap-2 tablet:hidden">
            <Image
              src="/arrowGray.svg"
              width={12}
              height={12}
              className="w-auto h-auto"
              alt="flecha"
            />
            <h3 className="underline text-color-dark">Tu actividad</h3>
          </div>
          <SearchFormActivity />
          <div className="w-full h-full bg-white rounded-lg drop-shadow-lg p-4">
            <h2 className="font-bold pb-6">Tu actividad</h2>
            <Activity />
          </div>
        </div>
      </section>
      <Filter /> 
    </main>
  );
};

export default Page;
