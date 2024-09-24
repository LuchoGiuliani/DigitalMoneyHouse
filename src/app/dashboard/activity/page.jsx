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
  const [originalAccountActivity, setOriginalAccountActivity] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [filter, setFilter] = useState(""); 
  const [periodFilter, setPeriodFilter] = useState(null); 

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, (activities) => {
        setAccountActivity(activities);
        setOriginalAccountActivity(activities);
      }, token).finally(() => setLoading(false));
    }
  }, [token]);

  
  const applyFilters = () => {
    let filteredActivities = [...originalAccountActivity]; 

   
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

   
    setAccountActivity(filteredActivities);
  };

 
  useEffect(() => {
    if (originalAccountActivity) {
      applyFilters();
    }
  }, [filter, periodFilter, originalAccountActivity]);

 
  const clearFilters = () => {
    setFilter(""); 
    setPeriodFilter(null); 
    setAccountActivity(originalAccountActivity); 
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
          <SearchFormActivity setFilter={setFilter} />
          <div className="w-full h-full bg-white rounded-lg drop-shadow-lg p-4">
            <h2 className="font-bold pb-6">Tu actividad</h2>
            <Activity accountActivity={accountActivity} />
          </div>
        </div>
      </section>
      <Filter setPeriodFilter={setPeriodFilter} clearFilters={clearFilters} />
    </main>
  );
};

export default Page;
