"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import getAccountActivity from "@/services/getAccountActivity";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import "dayjs/locale/es";
import Activity from "@/components/Activity/Activity";
import SearchFormActivity from "@/components/SearchFormActivity/SearchFormActivity";

dayjs.locale("es");

const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token).finally(
        () => setLoading(false)
      );
    }
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <main className="">
      <section className="flex text-[16px] tablet:text-[24px] min-h-screen ">      
        <div className="px-6 py-6 tablet:px-[79px] tablet:py-[40px] flex flex-col gap-2 w-full bg-[#EEEAEA]">
        <div className="flex gap-2 tablet:hidden ">
          <Image
           src="/arrowGray.svg"
           width={12}
           height={12}
           className="w-auto h-auto"
           alt="flecha" />
           <h3 className="underline text-color-dark">Inicio</h3>
        </div>
          {accountData && (
            <article className="bg-color-darker p-4 rounded-lg drop-shadow-lg tablet:min-h-[230px] ">
              <div className="flex justify-end gap-2">
                <Link
                  className="text-white underline hover:text-color-primary text-[16px]"
                  href="/dashboard/cards"
                >
                  Ver tarjetas
                </Link>
                <Link
                  className="text-white underline hover:text-color-primary text-[16px]"
                  href="/dashboard/profile"
                >
                  Ver CVU
                </Link>
              </div>
              <div>
                <h3 className="text-white p-2 font-bold tablet:text-[24px]">
                  Dinero disponible
                </h3>
                <h1 className="text-white border border-color-primary w-fit p-2 rounded-full text-[24px] tablet:text-[46px] font-bold">
                  ${" "}
                  {accountData.available_amount.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h1>
              </div>
            </article>
          )}
          <article className="flex gap-2 justify-center items-center flex-col desktop:flex-row">
            <Link
              className="bg-color-primary w-full text-center p-4  font-bold rounded-lg drop-shadow-lg "
              href="/dashboard/loadMoney"
            >
              Cargar dinero
            </Link>
            <Link
              className="bg-color-primary w-full text-center p-4  font-bold rounded-lg drop-shadow-lg "
              href="/dashboard/payServices"
            >
              Pago de servicios
            </Link>
          </article>
          <SearchFormActivity />

          <article className="bg-white rounded-lg p-6 drop-shadow-lg ">
            <h2 className="font-bold pb-6">Tu actividad</h2>
            <Activity />
          </article>
        </div>
      </section>
    </main>
  );
};

export default Page;
