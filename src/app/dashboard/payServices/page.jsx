"use client";
import getServices from "@/services/getServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices(setServices);
  }, []);
  console.log(services);

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
        Formulario busqueda: Busca entre mas de 5000 empresas
      </div>
      <div className="rounded-lg bg-white flex flex-col gap-4 p-6">
        <h2 className="font-bold pb-4 border-b ">Mas recientes</h2>

        <div className="flex gap-2 justify-between border-b pb-2">
          <div className="flex flex-col gap-2 w-full">
            {services &&
              services.map((sv) => (
                <div className="flex justify-between border-b py-2">
                  <h1>{sv.name}</h1>
                  <button className="font-bold">Seleccionar</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
