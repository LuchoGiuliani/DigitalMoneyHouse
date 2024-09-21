"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import useCards from "@/hooks/useCards";

const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const { token } = useAuth();
  const router = useRouter();

  const account_id = accountData?.id;

  const { cards, handleAddCard, handleDeleteCard } = useCards(account_id);

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token, account_id]);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const cardData = {
      cod: parseInt(state.number, 10),
      expiration_date: state.expiry,
      first_last_name: state.name,
      number_id: state.number,
    };
    
    try {
      await handleAddCard(cardData);
      router.push("/dashboard/tarjetas");
    } catch (error) {
      console.error("Error:", error);
    }
  };



  
  return (
    <div>
      <div className="flex min-h-screen">
      
        <div className="flex flex-col bg-gray-300 w-full px-8 py-4 gap-4">
        <div className="flex gap-2 tablet:hidden">
          <Image
           src="/arrowGray.svg"
           width={12}
           height={12}
           className="w-auto h-auto"
           alt="flecha" />
           <h3 className="underline text-color-dark">Tarjetas</h3>
        </div>
          <div className="bg-[#201F22] flex flex-col rounded-md p-6 gap-4">
            <h2 className="text-white font-semibold text-[18px]">
              Agregá tu tarjeta de crédito o débito.
            </h2>
            <Link
              href={"/dashboard/cards/newCard"}
              className="flex gap-4 justify-between"
            >
              <div className="flex gap-2">
                <Image
                  src={"/cruz.svg"}
                  width={22}
                  height={22}
                  alt="Cruz"
                  className="w-auto h-auto"
                />
                <h2 className="font-bold text-color-primary text-[18px] tablet:text-[22px] ">Nueva tarjeta</h2>
              </div>
              <Image
               src={"/arrow.svg"} width={20} height={20} alt="cruz" className="h-auto w-auto"
              />
            </Link>
          </div>
          <div className="flex flex-col bg-white p-6 gap-4 rounded-md">
            <h2 className="font-semibold">Tus tarjetas</h2>

            {cards?.length > 0 ? (
              cards?.map((card) => (
                <div
                  key={card.id}
                  className="flex justify-between border-b p-2"
                >
                  <div className="flex gap-4">
                    <div className="rounded-full h-6 w-6 bg-color-primary"></div>
                    <h2 className="text-[14px] tablet:text-[22px]">Terminada en {card.cod.toString().slice(-4)}</h2>
                  </div>
                  <button
                    className="font-semibold text-[14px] tablet:text-[22px]"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No hay tarjetas asociadas a esta cuenta
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
