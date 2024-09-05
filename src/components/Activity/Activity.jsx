// components/Activity/Activity.js
"use client";

import React, { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import { useActivity } from "@/context/activityContext";

dayjs.locale("es");

const Activity = () => {
  const {
    accountData,
    setAccountData,
    accountActivity,
    setAccountActivity,
    currentPage,
    setCurrentPage,
    filter, // Get the filter value from context
  } = useActivity();

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = Array.isArray(accountActivity)
  ? accountActivity.filter((activity) => {
      // lógica de filtrado aquí
      if (!filter) return true; // No filter applied
      const typeMatch = activity.type === filter; // Example filter logic
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

  return (
    <>
      <div>
        {currentItems.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-start border-y py-2"
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
                ${activity.amount.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">
                {dayjs(activity.dated).format("dddd")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border ${
              currentPage === i + 1 ? "bg-color-primary rounded-full" : "rounded-full"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Activity;
