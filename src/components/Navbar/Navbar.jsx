"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { userData, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // This effect will run whenever userData changes
  }, [userData]);

  const isLoginPass = pathname === "/login/loginPassword";
  const isLoginPage = pathname === "/login";
  const isRegister = pathname === "/register";
  const isLandingPage = pathname === "/";
  const isDashboardPage = pathname.startsWith("/dashboard");

  const navbarClass =
    isLoginPage || isLoginPass || isRegister
      ? "bg-color-primary"
      : "bg-color-darker";
  const logoSrc =
    isLoginPage || isLoginPass || isRegister ? "/logo2.png" : "/logo1.png";
  const loginButton =
    isLoginPage || isLoginPass
      ? "hidden"
      : "border border-color-primary p-2  m-1 rounded-md text-color-primary font-bold";
  const registerButton = isRegister ? "" : "";

  return (
    <div
      className={`${navbarClass} flex justify-between px-4 py-3 items-center max-h-[68px]`}
    >
      <section>
        <Link href={"/"}>
          <Image
            className="w-auto h-auto"
            src={logoSrc}
            alt="Logo"
            width={96}
            height={43}
            priority
          />
        </Link>
      </section>
      <section className="flex gap-1 items-center">
        {isLandingPage && !isAuthenticated() && (
          <Link href={"/login"} className={`${loginButton}`}>
            Ingresar
          </Link>
        )}
        {isAuthenticated() && !isLoading && (
          <>
            <Link href="/dashboard" className="text-white flex gap-2">
              <div className="bg-color-primary text-black px-2 rounded-md">
                {userData?.firstname[0]?.toUpperCase()}
                {userData?.lastname[0]?.toUpperCase()}
              </div>
              <h1 className={` hidden md:block`}>
                Hola, {userData?.firstname} bienvenido
              </h1>
            </Link>
            {!isDashboardPage && (
              <button onClick={logout} className={`${loginButton}`}>
                Logout
              </button>
            )}
          </>
        )}
        {isLandingPage && !isAuthenticated() && (
          <Link
            href={"/register"}
            className={`bg-color-primary rounded-md text-color-darker font-bold p-2`}
          >
            Crear Cuenta
          </Link>
        )}
        {isRegister && (
          <Link
            href={"/login"}
            className={`bg-color-dark text-white p-2 rounded-md font-bold`}
          >
            Iniciar sesión
          </Link>
        )}
      </section>
    </div>
  );
};

export default Navbar;
