"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCards from "@/hooks/useCards";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";

const Page = () => {
  const { token } = useAuth();
  const [accountData, setAccountData] = useState(null);
  const account_id = accountData?.id;

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, token);
    }
  }, [token]);

  const { cards, handleAddCard, handleDeleteCard } = useCards(account_id);

  console.log("cards", cards);

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

  const handleSubmit = async () => {
    try {
      await handleAddCard(state, token);
      // Limpia el estado del formulario si es necesario
      setState({ number: "", expiry: "", cvc: "", name: "", focus: "" });
    } catch (error) {
      console.error("Error submitting card:", error);
    }
  };

  return (
    <div>
      <div className="flex">
        <LeftSidebar />
        <div className="flex flex-col bg-gray-300 w-full px-8 py-4 gap-4">
          <div className="bg-[#201F22] flex flex-col rounded-md p-6 gap-4">
            <h2 className="text-white font-semibold">
              Agregá tu tarjeta de crédito
            </h2>
            <Link
              href={"/dashboard/cards/newCard"}
              className="flex gap-4 justify-between"
            >
              <div className="flex gap-4">
                <Image src={"/cruz.png"} width={22} height={22} alt="Cruz" className="w-auto h-auto" />
                <h2 className="font-bold text-color-primary">Nueva tarjeta</h2>
              </div>
              <Image className="w-4 h-4" alt="arrow" src={"/arrow.png"} width={22} height={22} />
            </Link>
          </div>
          <div className="flex flex-col bg-white p-6 gap-4 rounded-md">
            <h2 className="font-semibold">Tus tarjetas</h2>
            {cards.map((card) => (
              <div key={card.id} className="flex justify-between">
                <div className="flex gap-4">
                  <Image
                    src={"/circle.png"}
                    alt="circle"
                    width={22}
                    height={22}
                    className="w-auto h-auto" 
                  />
                  <h2>Terminada en {card.number_id}</h2>
                </div>
                <button onClick={() => handleDeleteCard(card.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
