"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
   
      <div className="bg-color-gray w-full p-8 ">
        <div className="bg-color-darker p-8 rounded-lg flex flex-col gap-6 ">
          <h1 className="text-color-primary font-bold">
            ¿Cuánto quéres ingresar a la cuenta?
          </h1>
          <form className="flex flex-col gap-4" action="">
            <div className="flex ">
              <input className="rounded-xl p-2 " type="text" placeholder="$0" />
            </div>
            <div className="w-full flex justify-end">
              <button className="bg-color-gray rounded-lg p-2  ">
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
