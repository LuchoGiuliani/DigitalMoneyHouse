"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import getAccountActivity from "@/services/getAccountActivity";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import search from "../../../public/search.png";
import "dayjs/locale/es";
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
    <main>
      <section className="flex">
       
        <div className="h-screen px-6 py-4 flex flex-col gap-2 w-full bg-[#EEEAEA]">
          {accountData && (
            <article className="bg-color-darker p-4 rounded-lg drop-shadow-lg">
              <div className="flex justify-end gap-2">
                <Link
                  className="text-white underline"
                  href="/dashboard/profile"
                >
                  Ver tarjetas
                </Link>
                <Link
                  className="text-white underline"
                  href="/dashboard/profile"
                >
                  Ver CVU
                </Link>
              </div>
              <div>
                <h3 className="text-white p-2 font-bold">Dinero disponible</h3>
                <h1 className="text-white border border-color-primary w-fit p-2 rounded-full text-4xl font-bold">
                  $ {accountData.available_amount}
                </h1>
              </div>
            </article>
          )}
          <article className="flex gap-2 justify-center items-center">
            <Link
              className="bg-color-primary w-full text-center p-4 text-xl font-bold rounded-lg drop-shadow-lg"
              href=""
            >
              Cargar dinero
            </Link>
            <Link
              className="bg-color-primary w-full text-center p-4 text-xl font-bold rounded-lg drop-shadow-lg"
              href=""
            >
              Pago de servicios
            </Link>
          </article>
          <article className="border w-full rounded-lg drop-shadow-lg flex items-center px-2 bg-white ">
            <Image
              src={search}
              width={20}
              height={10}
              alt="search"
              className="max-w-[24px] max-h-[20px]"
            />
            <h2 className="text-lg p-2">Buscar en tu actividad</h2>
          </article>
          <article className="bg-white rounded-lg p-6 drop-shadow-lg h-full">
            <h1 className="font-bold pb-6">Tu actividad</h1>
            {accountActivity && accountActivity.length > 0 ? (
              <div>
               
                <h1>
                  {accountActivity.map((act, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start border-y py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-lime-500"></div>

                        {act.type === "Transfer" &&
                        act.origin === accountData.cvu ? (
                          <p className="font-semibold">
                            Transferiste a {act.destination}
                          </p>
                        ) : (
                          <p className="font-semibold">Ingresaste dinero</p>
                        )}
                      </div>
                      <div className="flex  flex-col">
                        <p className="font-semibold text-right">
                          {act.type === "Transfer" &&
                          act.origin === accountData.cvu ? (
                            <>${act.amount.toFixed(2)}</>
                          ) : (
                            <>${act.amount.toFixed(2)}</>
                          )}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {dayjs(act.dated).format("dddd")}
                        </p>
                      </div>
                    </div>
                  ))}
                </h1>
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
