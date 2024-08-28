"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Activity from "@/components/Activity/Activity";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);

import { useForm } from "react-hook-form";

const page = () => {
  const { token } = useAuth();
  const [accountData, setAccountData] = useState([]);
  const [accountActivity, setAccountActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // State to manage the selected filter
  const { register, handleSubmit, reset } = useForm(); // react-hook-form
  const [openFilter, setOpenFilter] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token]);

  console.log("AccountData", accountData);
  console.log("AccountActivity", accountActivity);
  



  const clearFilter = () => {
    setFilter(""); // Clear the filter state
  setAccountActivity(accountData); // Reset the account activity to all data
  reset(); // Reset the form
  setOpenFilter(false); // Close the filter modal
  };

  const handleClick = () => {
    setOpenFilter(!openFilter);
    
  };
  console.log(handleClick);


  const applyFilter = (data) => {
    const { period } = data;
  
    const filteredActivities = accountActivity.filter((activity) => {
      const activityDate = dayjs(activity.dated);
  
      switch (period) {
        case "today":
          return activityDate.isToday();
        case "yesterday":
          return activityDate.isYesterday();
        case "lastWeek":
          return activityDate.isBetween(dayjs().subtract(1, 'week'), dayjs());
        case "lastMonth":
          return activityDate.isBetween(dayjs().subtract(1, 'month'), dayjs());
        case "lastYear":
          return activityDate.isBetween(dayjs().subtract(1, 'year'), dayjs());
        default:
          return true; // If no filter is selected, return all activities
      }
    });
  
    setAccountActivity(filteredActivities);
    setFilter(period); // Update the selected filter
  };
  

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
            <button
              className="bg-color-primary p-2 rounded-lg drop-shadow-lg min-w-[164px] flex gap-2 items-center font-semibold"
              onClick={handleClick}
            >
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
              accountActivity={accountActivity?.filter((activity) => {
                // Apply filtering logic based on the selected filter
                if (!filter) return true; // If no filter is selected, return all activities
                // Add filtering conditions here
              })}
              itemsPerPage={itemsPerPage}
              accountData={accountData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>

      {/* Filter Modal */}
      <div   className={`fixed top-0 right-0 w-1/4 bg-white p-4 shadow-lg transform transition-transform duration-300 ${
          openFilter ? "translate-x-0" : "translate-x-full"
        }`}>
        <form onSubmit={handleSubmit(applyFilter)}>
          <h3 className="font-bold mb-4">Filtrar</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center">
              <input type="radio" value="today" {...register("period")} />
              <span className="ml-2">Hoy</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="yesterday" {...register("period")} />
              <span className="ml-2">Ayer</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="lastWeek" {...register("period")} />
              <span className="ml-2">Última semana</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="lastMonth" {...register("period")} />
              <span className="ml-2">Último mes</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="lastYear" {...register("period")} />
              <span className="ml-2">Último año</span>
            </label>
            <button type="submit" className="bg-color-primary p-2 rounded-lg">
              Aplicar
            </button>
            <button
              type="button"
              className="bg-color-secondary p-2 rounded-lg"
              onClick={clearFilter}
            >
              Borrar filtros
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default page;
