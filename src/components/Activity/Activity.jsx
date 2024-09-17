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
    setAccountData,
    accountActivity,
    setAccountActivity,
    currentPage,
    setCurrentPage,
    filter,
  } = useActivity();

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const filteredItems = Array.isArray(accountActivity)
    ? accountActivity.filter((activity) => {
        if (!filter) return true;
        const typeMatch = activity.type === filter;
        return typeMatch;
      })
    : [];

  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token]);

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
          <p>No hay actividades para mostrar.</p>
        )}
      </div>
      {isDashboard ? (
        <>
          <Link
            className="flex justify-between font-bold py-2"
            href={"/dashboard/activity"}
          >
            <h3 className="hover:scale-95">Ver toda tu actividad</h3>
            <Image
              src={"/arrowBlack.svg"}
              width={20}
              height={20}
              alt="cruz"
              className="h-auto w-auto"
            />
          </Link>
        </>
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
