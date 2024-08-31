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
  } = useActivity();

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accountActivity.slice(indexOfFirstItem, indexOfLastItem);
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
              <div className="w-4 h-4 rounded-full bg-lime-500"></div>

              {activity.type === "Transfer" &&
              activity.origin === accountData.cvu ? (
                <p className="font-semibold">
                  Transferiste a {activity.destination}
                </p>
              ) : (
                <p className="font-semibold">Ingresaste dinero</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-right">
                {activity.type === "Transfer" &&
                activity.origin === accountData.cvu ? (
                  <>-${activity.amount.toFixed(2)}</>
                ) : (
                  <>+${activity.amount.toFixed(2)}</>
                )}
              </p>
              <p className="text-gray-500 text-sm">
                {dayjs(activity.dated).format("dddd")}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(accountActivity.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border ${
              currentPage === i + 1 ? "bg-gray-200" : ""
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
