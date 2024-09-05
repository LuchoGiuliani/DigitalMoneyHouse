// pages/activityPage.js
"use client";

import { ActivityProvider, useActivity } from "@/context/activityContext";
import Activity from "@/components/Activity/Activity";
import Filter from "@/components/Filter/Filter";

import { useState } from "react";
import { useForm } from "react-hook-form";
import SearchFormActivity from "@/components/SearchFormActivity/SearchFormActivity";

const page = () => {
  return (
    <main className="bg-color-gray min-h-screen text-[18px] tablet-[12px]">
      <section className="flex">
        <div className="p-6 tablet:p-10 w-full flex flex-col gap-4">
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

export default page;
