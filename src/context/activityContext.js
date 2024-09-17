
"use client";

import React, { createContext, useContext, useState } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [accountData, setAccountData] = useState([]);
  const [accountActivity, setAccountActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(null)
  


  return (
    <ActivityContext.Provider
      value={{
        accountData,
        setAccountData,
        accountActivity,
        setAccountActivity,
        currentPage,
        setCurrentPage,
        openFilter,
        setOpenFilter,
        filter,
        setFilter
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
