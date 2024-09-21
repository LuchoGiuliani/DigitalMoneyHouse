"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import { useActivity } from "@/context/activityContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

dayjs.locale("es");

const Activity = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const {
    accountData,
    accountActivity,
    setAccountActivity,
    originalAccountActivity,       // Referencia al estado original
    setOriginalAccountActivity,    // Setter del estado original
    setAccountData,
    setCurrentPage,
    currentPage,
    filter,
  } = useActivity();

  const itemsPerPage = pathname === "/dashboard" ? 4 : 10;
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar las actividades según el tipo especificado en el filtro
  const filteredItems = Array.isArray(accountActivity)
  ? accountActivity.filter((activity) => {
      if (!filter) return true;

      const lowerCaseFilter = filter.toLowerCase();

      // Concatenar los valores relevantes de la actividad en una sola cadena
      const activityText = `
        ${activity.type} 
        ${activity.description || ""} 
        ${activity.destination || ""} 
        ${activity.origin || ""}
      `.toLowerCase();

      // Comparar la cadena con el filtro
      return activityText.includes(lowerCaseFilter);
    })
  : [];

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      // Guarda una copia de las actividades originales
      getAccountActivity(setAccountData, (data) => {
        setAccountActivity(data);
        setOriginalAccountActivity(data); // Guarda el estado original aquí
      }, token);
    }
  }, [token, setAccountData, setAccountActivity, setOriginalAccountActivity]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isDashboard = pathname === "/dashboard";

  const handleSelectActivity = (activity) => {
    if (!activity || !activity.id) {
      console.error("Activity data is invalid:", activity);
      return;
    }

    setSelectedActivity(activity);
    router.push(`/dashboard/activity/activityDetail?id=${activity.id}`); 
  };

  console.log("Current accountActivity:", accountActivity);

  return (
    <>
      <div>
        {currentItems.length > 0 ? (
          currentItems.map((activity, index) => (
            <div
              key={index}
              onClick={() => handleSelectActivity(activity)}
              className="flex justify-between items-start border-y py-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-color-primary"></div>

                {activity.type === "Transfer" &&
                activity.origin === accountData.cvu ? (
                  <p>Transferiste a {activity.destination}</p>
                ) : (
                  <p>Ingresaste dinero</p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold text-right">
                  ${activity.amount?.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  {dayjs(activity.dated).format("dddd")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[16px] font-thin">No hay actividades para mostrar.</p>
        )}
      </div>
      {isDashboard ? (
        <Link
          className="flex justify-between font-bold py-2"
          href={"/dashboard/activity"}
        >
          <h3 className="hover:scale-95 text-[20px]">Ver toda tu actividad</h3>
          <Image
            src={"/arrowBlack.svg"}
            width={20}
            height={20}
            alt="cruz"
            className="h-auto w-auto"
          />
        </Link>
      ) : (
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border ${
                currentPage === i + 1
                  ? "bg-color-primary rounded-full"
                  : "rounded-full"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Activity;
