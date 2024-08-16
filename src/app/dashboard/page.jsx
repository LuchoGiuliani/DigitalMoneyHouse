"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import getAccountActivity from "@/services/getAccountActivity";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { token } = useAuth();

  useEffect(() => {
    if(token){
      getAccountActivity(setAccountData, setAccountActivity, token).finally(() =>
        setLoading(false)
      );
    }
   
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un indicador de carga
  }

  return (
    <main>
      <section className="flex">
        <LeftSidebar />
        <div className="h-screen px-6 py-4 flex flex-col gap-2 w-full">
          {accountData && (
            <article className="bg-color-darker p-4 rounded-lg">
              <div className="flex justify-end gap-2">
                <Link className="text-white underline" href="/dashboard/perfil">
                  Ver tarjetas/ alias : {accountData.alias}
                </Link>
                <Link className="text-white underline" href="/dashboard/perfil">
                  Ver CVU: {accountData.cvu}
                </Link>
              </div>
              <div>
                <h3 className="text-white p-2">Dinero disponible</h3>
                <h1 className="text-white border border-color-primary w-fit p-2 rounded-full text-4xl font-bold">
                  $ {accountData.available_amount}
                </h1>
              </div>
            </article>
          )}
          <article className="flex gap-2 justify-center items-center">
            <Link
              className="bg-color-primary w-full text-center p-4 text-xl font-bold"
              href=""
            >
              Cargar dinero
            </Link>
            <Link
              className="bg-color-primary w-full text-center p-4 text-xl font-bold"
              href=""
            >
              Pago de servicios
            </Link>
          </article>
          <article className="border w-full">
            <h2 className="text-xl">Buscar en tu actividad</h2>
          </article>
          <article>
            <h1>Tu actividad</h1>
            {accountActivity && accountActivity.length > 0 ? (
              <div>
                <div>TABLA ACTIVIDAD</div>
                <h1>Ver toda tu actividad</h1>
              </div>
            ) : (
              <div>No hay actividad disponible</div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
};

export default Page;
