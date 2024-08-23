"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { addCard, getCards } from "@/services/getCards";
import { useAuth } from "@/hooks/useAuth";
import getAccountId from "@/services/getAccountId";

const MAX_CARDS = 10;

const Page = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [account_id, setAccountId] = useState(null);
  const [cardsCount, setCardsCount] = useState(0);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      if (token) {
        const id = await getAccountId(token);
        setAccountId(id);
        const cards = await getCards(id, token);
        setCardsCount(cards.length);
      }
    };

    fetchAccountData();
  }, [token]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (cardsCount >= MAX_CARDS) {
      alert("Se ha alcanzado el límite de 10 tarjetas asociadas a esta cuenta.");
      return;
    }

    const cardData = {
      cod: parseInt(state.number, 10),
      expiration_date: state.expiry,
      first_last_name: state.name,
      number_id: 0,
    };

    try {
      if (account_id) {
        await addCard(account_id, cardData, token);
        router.push("/dashboard/cards");
      } else {
        console.error("account_id no disponible");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex  min-h-screen">
       
        <div className="px-8 py-6 w-full flex flex-col items-center">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <form
            className="flex flex-col p-4 gap-4 items-end"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="number"
                placeholder="Número de tarjeta"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="p-4 rounded-md drop-shadow-lg"
              />
              <input
                type="text"
                name="expiry"
                placeholder="Fecha de vencimiento"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="p-4 rounded-md drop-shadow-lg"
              />
              <input
                type="text"
                name="name"
                placeholder="Nombre y apellido"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="p-4 rounded-md drop-shadow-lg"
              />
              <input
                type="text"
                name="cvc"
                placeholder="Código de seguridad"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="p-4 rounded-md drop-shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-300 p-4 rounded-md w-fit"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
