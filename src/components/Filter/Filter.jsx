"use client";
import { useActivity } from "@/context/activityContext";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isYesterday from "dayjs/plugin/isYesterday";
import isToday from "dayjs/plugin/isToday";
import "dayjs/locale/es";
import { usePathname } from "next/navigation";

dayjs.extend(isBetween);
dayjs.extend(isYesterday);
dayjs.extend(isToday);

const Filter = () => {
  const { register, handleSubmit, reset } = useForm();
  const {
    setAccountActivity,
    accountActivity,
    openFilter,
    setOpenFilter,
    setOriginalAccountActivity,
    originalAccountActivity,
  } = useActivity();
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  useEffect(() => {
    if (!originalAccountActivity && accountActivity.length) {
      setOriginalAccountActivity(accountActivity);
    }
  }, [accountActivity, originalAccountActivity, setOriginalAccountActivity]);

  const clearFilter = () => {
    setAccountActivity(originalAccountActivity || []); // Resetear actividades
    reset();
    setOpenFilter(false);
  };

  const applyFilter = (data) => {
    const { period } = data;

    const filteredActivities = originalAccountActivity.filter((activity) => {
      const activityDate = dayjs(activity.dated);
      
      switch (period) {
        case "today":
          return activityDate.isToday();
        case "yesterday":
          return activityDate.isYesterday();
        case "lastWeek":
          return activityDate.isBetween(dayjs().subtract(1, "week"), dayjs());
        case "lastMonth":
          return activityDate.isBetween(dayjs().subtract(1, "month"), dayjs());
        case "lastYear":
          return activityDate.isBetween(dayjs().subtract(1, "year"), dayjs());
        default:
          return true;
      }
    });

    setAccountActivity(filteredActivities); // Actualizar actividades filtradas
    setOpenFilter(false); // Cerrar el filtro
  };

  return (
    <div
      className={` ${isDashboardPage ? "hidden " : ""} fixed top-0 right-0 tablet:w-1/4 bg-white p-4 shadow-lg transform transition-transform duration-300 ${openFilter ? "translate-x-0" : "translate-x-full"}`}
    >
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
  );
};

export default Filter;
