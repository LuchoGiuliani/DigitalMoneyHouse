"use client";
import getServices from "@/services/getServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { service } from "@/constants/services";
import { useSimpleFilter } from "@/hooks/useFilter";

const Page = () => {
  const [services, setServices] = useState([]);
  const { filteredList, searchInput, handleSearchInputChange } = useSimpleFilter(
    services,
    "name"
  );

  useEffect(() => {
    getServices(setServices);
  }, []);

  return (
    <div className="bg-color-gray min-h-screen p-8 flex flex-col gap-4">
      <div className="flex gap-2 tablet:hidden">
        <Image
          src="/arrowGray.svg"
          width={12}
          height={12}
          className="w-auto h-auto"
          alt="flecha"
        />
        <h3 className="underline text-color-dark">Pagar servicio</h3>
      </div>
      <div className="rounded-lg bg-white text-gray-300 p-2">
      <input
				type="text"
				placeholder="Buscar en tu actividad"
				className="flex-grow pl-2 py-1 text-base border-none focus:border-none focus-visible:outline-none text-black"
				value={searchInput}
				onChange={handleSearchInputChange}
			/>
      </div>
      <div className="rounded-lg bg-white flex flex-col gap-4 p-6">
        <h2 className="font-bold pb-4 border-b ">Más recientes</h2>

        <div className="flex gap-2 justify-between border-b pb-2">
          <div className="flex flex-col gap-2 w-full">
            {services &&
              services.map((sv) => (
                <div key={sv.id} className="flex justify-between border-b py-2">
                  <div className="flex items-center gap-4">         
                    <Image
                      src={service[sv.id].src}
                      width={24}
                      height={24}
                      className="w-[46px] h-[24px]"
                      alt={service[sv.id].alt}
                    />
                    <h1>{sv.name}</h1>
                  </div>
                  <button className="font-bold">Seleccionar</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
