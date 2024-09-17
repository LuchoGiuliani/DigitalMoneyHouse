import { useActivity } from "@/context/activityContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SearchFormActivity = () => {
  const { register, handleSubmit } = useForm();
  const { setFilter, openFilter, setOpenFilter } = useActivity();
  const pathname = usePathname()

  const isDashboardPage = pathname === "/dashboard"


  const handleClick = () => {
    setOpenFilter(!openFilter);
  };

  const onSubmit = (data) => {
    setFilter(data.searchTerm); 
  };


  return (
    <div>
      <div className="flex w-full gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full p-2 flex gap-2 items-center rounded-lg drop-shadow-lg"
        >
          <Image
            src={"/search.svg"}
            width={6}
            height={0}
            className="w-auto h-auto"
            alt="search"
          />
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            {...register("searchTerm")}
            className="text-gray-400 text-[12px] mobile:text-[16px] outline-none w-full"
          />
          <button type="submit" className="hidden"></button>
        </form>
        <button
          className={`${isDashboardPage ? "hidden " : ""}bg-color-primary p-2 px-4 rounded-lg drop-shadow-lg flex gap-2 items-center font-semibold`}
          onClick={handleClick}
        >
          Filtrar
          <Image
            src={"/filter.png"}
            width={2}
            height={0}
            className="h-auto w-auto"
            alt="filter"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchFormActivity;
