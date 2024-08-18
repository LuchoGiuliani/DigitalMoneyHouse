"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import useCards from "@/hooks/useCards";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const { token } = useAuth();
  const [accountActivity, setAccountActivity] = useState(null);
  const account_id = accountData?.id;
  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token, account_id]);

  const { allCards } = useCards();
  const router = useRouter();
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/accounts/${account_id}/cards`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        setCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, [token, account_id]);

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
      cod: 0,
      expiration_date: "08/2025",
      first_last_name: state.name,
      number_id: state.number,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/accounts/${account_id}/cards`,
        cardData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Redirigir y actualizar la lista de tarjetas
      router.push("/dashboard/tarjetas");
      setCards([...cards, response.data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/accounts/${account_id}/cards/${cardId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Actualizar la lista de tarjetas después de eliminar una
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div>
      <div className="flex">
        <LeftSidebar />
        <div className="flex flex-col bg-gray-300 w-full px-8 py-4 gap-4">
          <div className="bg-[#201F22] flex flex-col rounded-md p-6 gap-4">
            <h2 className="text-white font-semibold">
              Agregá tu tarjeta de crédito o débito.
            </h2>
            <Link
              href={"/dashboard/cards/newCard"}
              className="flex gap-4 justify-between"
            >
              <div className="flex gap-4">
                <Image src={"/cruz.png"} width={22} height={22} alt="Cruz" />
                <h2 className="font-bold text-color-primary">Nueva tarjeta</h2>
              </div>
              <Image alt="arrow" src={"/arrow.png"} width={22} height={0} />
            </Link>
          </div>
          <div className="flex flex-col bg-white p-6 gap-4 rounded-md">
            <h2 className="font-semibold">Tus tarjetas</h2>
            {cards.map((card) => (
              <div key={card.id} className="flex justify-between border-b p-2">
                <div className="flex gap-4 ">
                  <div className="rounded-full h-6 w-6 bg-color-primary"></div>
                  <h2>Terminada en {card.number_id}</h2>
                </div>
                <button className="font-semibold" onClick={() => handleDelete(card.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
