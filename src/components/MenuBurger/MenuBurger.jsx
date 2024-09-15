"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const MenuBurguer = ({ isOpen, toggleMenu, userData }) => {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 right-0 bg-color-primary h-full w-full  transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="bg-color-dark w-full h-[120px] p-4 flex flex-col">
        <Image
          className="absolute top-4 right-4 text-white w-auto h-auto"
          onClick={toggleMenu}
          src="/greenCross.svg"
          width={14}
          height={14}
          alt="Cruz"
        />

        <h1 className={` text-white`}>
          Hola, <br /> {userData?.firstname} {userData?.lastname}
        </h1>
      </div>
      <nav className="flex flex-col gap-4 mt-10 p-4">
        <Link
          href="/dashboard"
          className={pathname === "/dashboard" ? "font-bold" : ""}
          onClick={toggleMenu}
        >
          Inicio
        </Link>
        <Link
          href="/dashboard/activity"
          className={
            pathname.startsWith("/dashboard/activity") ? "font-bold" : ""
          }
          onClick={toggleMenu}
        >
          Actividad
        </Link>
        <Link
          href="/dashboard/profile"
          className={pathname === "/dashboard/profile" ? "font-bold" : ""}
          onClick={toggleMenu}
        >
          Tu perfil
        </Link>
        <Link
          href="/dashboard/loadMoney"
          className={
            pathname.startsWith("/dashboard/loadMoney") ? "font-bold" : ""
          }
          onClick={toggleMenu}
        >
          Cargar dinero
        </Link>
        <Link
          href="/dashboard/payServices"
          className={
            pathname.startsWith("/dashboard/payServices") ? "font-bold" : ""
          }
          onClick={toggleMenu}
        >
          Pagar servicios
        </Link>
        <Link
          href="/dashboard/cards"
          className={pathname.startsWith("/dashboard/cards") ? "font-bold" : ""}
          onClick={toggleMenu}
        >
          Tarjetas
        </Link>
        <button
          className="text-start"
          onClick={() => {
            logout();
            toggleMenu();
          }}
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default MenuBurguer;
