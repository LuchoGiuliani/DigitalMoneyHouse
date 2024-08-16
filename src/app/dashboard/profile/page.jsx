"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";


import { TokenContext } from "@/context/tokenContext";
import { useAuth } from "@/hooks/useAuth";
import getAccountDetail from "@/services/getUserAccount";
import { getUserById } from "@/services/getUserById";



import updateUser from "@/services/updateUser"; // Importa la función de actualización
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const { token, setToken } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    cuit: "",
    phone: "",
    password: "******",
  });

  const [editState, setEditState] = useState({
    email: false,
    firstname: false,
    lastname: false,
    cuit: false,
    phone: false,
    password: false,
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      if (tokenFromStorage) {
        try {
          await getAccountDetail(setAccountData, tokenFromStorage);
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
    };

    fetchAccountData();
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      const userId = JSON.parse(window.localStorage.getItem("user_id"));
      if (tokenFromStorage && userId) {
        try {
          const data = await getUserById(userId, tokenFromStorage);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]); // Dependencia en el token

  useEffect(() => {
    if (userData) {
      setFormState({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        cuit: userData.cuit,
        phone: userData.phone,
        password: "******", // No mostrar la contraseña real
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditState((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleSave = async (field) => {
    const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenFromStorage);
    try {
      await updateUser({ [field]: formState[field] }, userData.id, tokenFromStorage);
      setEditState((prevState) => ({ ...prevState, [field]: false }));
      const updatedUserData = await getUserById(userData.id, tokenFromStorage);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        alert("Copiado al portapapeles!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        alert("Error al copiar!");
      });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <main className="bg-gray-200">
      <section className="flex">
        <LeftSidebar />
        <div className="h-screen px-6 py-4 flex flex-col gap-4 w-full">
          <article className="bg-white flex flex-col rounded-md p-4 drop-shadow-md">
            <div>
              <h1 className="font-bold text-[24px]">Tus datos</h1>
            </div>
            <div className="flex justify-between gap-2 w-full border-b">
              <div className="flex gap-6 w-full items-center">
                <h2 className="font-semibold min-w-[220px] capitalize">
                  Email
                </h2>
                <input
                  type="email"
                  name="email"
                  value={formState.email || ""}
                  disabled
                  className=""
                />
              </div>
            </div>
            {["firstname", "lastname", "cuit", "phone", "password"].map(
              (field, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-2 w-full border-b"
                >
                  <div className="flex gap-6 w-full items-center">
                    <h2 className="font-semibold min-w-[220px] capitalize">
                      {field}
                    </h2>
                    <input
                      type={field === "password" ? "password" : "text"}
                      name={field}
                      value={formState[field] || ""}
                      onChange={handleInputChange}
                      disabled={!editState[field]}
                      className={editState[field] ? "" : ""}
                    />
                  </div>
                  <button
                    onClick={() =>
                      editState[field] ? handleSave(field) : handleEdit(field)
                    }
                    className={` ${
                      editState[field] ? "bg-color-primary" : "bg-white"
                    } text-white p-2 rounded`}
                  >
                    <Image
                      width={22}
                      height={22}
                      alt="iconoEdit"
                      src="/iconoEdit.png"
                    />
                  </button>
                </div>
              )
            )}
          </article>
          <article className="bg-color-primary p-4 flex  w-full rounded-md drop-shadow-md">
            <Link
              className="text-2xl font-bold flex justify-between w-full"
              href=""
            >
              Gestiona los medios de pago
              <Image
                width={42}
                height={8}
                alt="iconoflecha"
                className="w-auto h-auto"
                src="/iconoFlecha.png"
              />
            </Link>
          </article>
          {accountData && (
            <article className="bg-black text-white p-4 rounded-md drop-shadow-md flex flex-col gap-4">
              <h2 className="text-white">
                Copia tu CVU o alias para ingresar o transferir dinero desde
                otra cuenta
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-color-primary">CVU</h2>
                    <h3>{accountData.cvu}</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(accountData.cvu)}
                    className=" text-white p-2 rounded"
                  >
                    <Image
                      width={22}
                      height={22}
                      alt="iconoCopy"
                      src="/iconoCopy.png"
                      className="w-auto h-auto"
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-color-primary">Alias</h2>
                    <h3>{accountData.alias}</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(accountData.alias)}
                    className=" text-white p-2 rounded"
                  >
                    <Image
                      width={22}
                      height={22}
                      alt="iconoCopy"
                      src="/iconoCopy.png"
                       className="w-auto h-auto"
                    />
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
