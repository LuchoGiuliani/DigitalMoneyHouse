"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/getUserById";

const Navbar = () => {
  const { isAuthenticated, logout, token, setToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [user_id, setUser_id] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      const user_idStorage = JSON.parse(window.localStorage.getItem("user_id"));
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
  
      setUser_id(user_idStorage);
      setToken(tokenFromStorage);
  
      if (user_idStorage && tokenFromStorage) {
        try {
          const data = await getUserById(user_idStorage, tokenFromStorage);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
  
      setIsLoading(false);
    };
  
    fetchData();
  }, [setToken]);

  const isLoginPass = pathname === "/login/loginPassword";
  const isLoginPage = pathname === "/login";
  const isRegister = pathname === "/register";
 
  const navbarClass =
    isLoginPage || isLoginPass || isRegister ? "bg-color-primary" : "bg-color-darker";
  const logoSrc = isLoginPage || isLoginPass || isRegister ? "/logo2.png" : "/logo1.png";
  const loginButtom = isLoginPage  || isLoginPass
    ? "hidden"
    : "border border-color-primary p-2 rounded-md text-color-primary font-bold";


  return (
    <div className={`${navbarClass} flex justify-between px-4 py-3 items-center  `}>
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
      <section className="flex gap-4 items-center">
        {pathname === "/register" ? (
          <Link
            href={"/login"}
            className={`${loginButtom}`}
          >
            Ingresar
          </Link>
        ) : isAuthenticated() ? (
          <>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Link href="/dashboard" className="text-white flex gap-2">
                <div className="bg-color-primary text-black px-2 rounded-md">
                  {userData?.firstname[0].toUpperCase()}
                  {userData?.lastname[0].toUpperCase()}
                </div>

                <Image
                  className="w-auto h-auto block md:hidden"
                  src={"/menuBurger.png"}
                  alt="burger"
                  width={96}
                  height={43}
                  priority
                />
                <h1 className={` hidden md:block`}>
                  Hola, {userData?.firstname ? userData.firstname : ""} bienvenido
                </h1>
              </Link>
            )}
            <button
              onClick={logout}
              className={`${loginButtom}`}
            >
              Logout
            </button>
          </>
        ) : (
          <div className={` flex gap-2`}>
            <Link
              href={"/login"}
              className={`${loginButtom}`}
            >
              Ingresar
            </Link>
            <Link
              href={"/register"}
              className={`bg-color-primary rounded-md text-color-darker font-bold p-2`}
            >
              Crear Cuenta
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
