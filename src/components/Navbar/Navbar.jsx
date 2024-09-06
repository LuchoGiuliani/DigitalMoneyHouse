"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/userContext";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, logout, token, login } = useAuth();
  const { userData, isLoading , accountData} = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      router.refresh()
    }
    fetchData()
  }, [userData, isAuthenticated, logout, token,accountData , login]);

  const isLoginPass = pathname === "/login/loginPassword";
  const isLoginPage = pathname === "/login";
  const isRegister = pathname.startsWith("/register");
  const isLandingPage = pathname === "/";
  const isDashboardPage = pathname.startsWith("/dashboard");

  const navbarClass = useMemo(() => {
    return isLoginPage || isLoginPass || isRegister
      ? "bg-color-primary"
      : "bg-color-darker";
  }, [isLoginPass, isLoginPage, isRegister]);

  const logoSrc = useMemo(() => {
    return isLoginPage || isLoginPass || isRegister
      ? "/logo2.png"
      : "/logo1.png";
  }, [isLoginPass, isLoginPage, isRegister]);

  const loginButton = useMemo(() => {
    return isLoginPage || isLoginPass
      ? "hidden"
      : "border border-color-primary p-2  m-1 rounded-md text-color-primary font-bold";
  }, [isLoginPass, isLoginPage]);

  const registerButton = useMemo(() => {
    return isRegister ? "" : "";
  }, [isRegister]);

  return (
    <div
      className={`${navbarClass} flex justify-between px-4 py-3 items-center max-h-[64px]`}
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
      <section className="flex gap-2 items-center">
        {isLandingPage && !isAuthenticated() && (
          <Link href={"/login"} className={`${loginButton}`}>
            Ingresar
          </Link>
        )}
        {isAuthenticated() && !isLoading && !isRegister && (
          <>
            <Link href="/dashboard" className="text-white flex gap-2">
              <div className="bg-color-primary text-black px-2 rounded-md">
                {userData?.firstname[0]?.toUpperCase()}
                {userData?.lastname[0]?.toUpperCase()}
              </div>
              <h1 className={` hidden tablet:block`}>
                Hola, {userData?.firstname} {userData?.lastname}
              </h1>
            </Link>
            <Image
              className="w-auto h-auto tablet:hidden"
              src="/menuBurger.svg"
              alt="Logo"
              width={96}
              height={43}
              priority
            />
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
            className={`bg-color-primary rounded-md text-color-darker font-bold p-2 `}
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
