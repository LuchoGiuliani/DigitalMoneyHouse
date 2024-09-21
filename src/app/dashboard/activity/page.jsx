"use client";
import Activity from "@/components/Activity/Activity";
import Filter from "@/components/Filter/Filter";
import SearchFormActivity from "@/components/SearchFormActivity/SearchFormActivity";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const [originalAccountActivity, setOriginalAccountActivity] = useState(null); // Para restaurar las actividades originales
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [filter, setFilter] = useState(""); // Estado para el filtro de texto
  const [periodFilter, setPeriodFilter] = useState(null); // Estado para el filtro de fecha

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, (activities) => {
        setAccountActivity(activities);
        setOriginalAccountActivity(activities); // Guardamos las actividades originales
      }, token).finally(() => setLoading(false));
    }
  }, [token]);

  // Función para aplicar los filtros (texto y fecha)
  const applyFilters = () => {
    let filteredActivities = [...originalAccountActivity]; // Trabajamos sobre las actividades originales

    // Filtrar por búsqueda de texto
    if (filter) {
      filteredActivities = filteredActivities.filter((activity) => {
        const lowerCaseFilter = filter.toLowerCase();
        const activityText = `
          ${activity.type} 
          ${activity.description || ""} 
          ${activity.destination || ""} 
          ${activity.origin || ""}
        `.toLowerCase();

        return activityText.includes(lowerCaseFilter);
      });
    }

    // Filtrar por período (fecha)
    if (periodFilter) {
      filteredActivities = filteredActivities.filter((activity) => {
        const activityDate = dayjs(activity.dated, "YYYY-MM-DDTHH:mm:ss.SSSZ");

        switch (periodFilter) {
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
    }

    // Actualizar la actividad filtrada
    setAccountActivity(filteredActivities);
  };

  // Aplicar los filtros cada vez que cambien
  useEffect(() => {
    if (originalAccountActivity) {
      applyFilters();
    }
  }, [filter, periodFilter, originalAccountActivity]);

  // Función para limpiar los filtros y restaurar las actividades originales
  const clearFilters = () => {
    setFilter(""); // Limpiamos el filtro de texto
    setPeriodFilter(null); // Limpiamos el filtro de fecha
    setAccountActivity(originalAccountActivity); // Restauramos las actividades originales
  };

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

          {/* Componente de búsqueda por texto */}
          <SearchFormActivity setFilter={setFilter} />

          <div className="w-full h-full bg-white rounded-lg drop-shadow-lg p-4">
            <h2 className="font-bold pb-6">Tu actividad</h2>

            {/* Componente de lista de actividades */}
            <Activity accountActivity={accountActivity} />
          </div>
        </div>
      </section>

      {/* Componente de filtro por fechas */}
      <Filter setPeriodFilter={setPeriodFilter} clearFilters={clearFilters} />
    </main>
  );
};

export default Page;
