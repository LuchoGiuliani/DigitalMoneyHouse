// pages/activityPage.js
"use client";

import { ActivityProvider, useActivity } from "@/context/activityContext";
import Activity from "@/components/Activity/Activity";
import Filter from "@/components/Filter/Filter";
import Image from "next/image";
import { useState } from "react";

const ActivityPage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleClick = () => {
    setOpenFilter(!openFilter);
  };


  return (
    <main className="bg-color-gray min-h-screen text-[18px] tablet-[12px]">
      <section className="flex">
        <div className="p-6 tablet:p-10 w-full flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="bg-white w-full p-2 flex gap-2 items-center rounded-lg drop-shadow-lg">
              <Image
                src={"/search.svg"}
                width={6}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
              <h1 className="text-gray-400 text-[12px]">
                Buscar en tu actividad
              </h1>
            </div>
            <button
              className="bg-color-primary p-2 px-4 rounded-lg drop-shadow-lg flex gap-2 items-center font-semibold"
              onClick={handleClick}
            >
              Filtrar
              <Image
                src={"/filter.png"}
                width={2}
                height={0}
                className="h-auto w-auto"
                alt="search"
              />
            </button>
          </div>
          <div className="w-full h-full bg-white rounded-lg drop-shadow-lg p-4">
            <h2 className="font-bold pb-6">Tu actividad</h2>
            <Activity />
          </div>
        </div>
      </section>
      {openFilter && <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} />}
    </main>
  );
};

const page = () => (
  <ActivityProvider>
    <ActivityPage />
  </ActivityProvider>
);

export default page;
