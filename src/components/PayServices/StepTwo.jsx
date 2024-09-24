import React, { useEffect, useState } from "react";
import useCards from "@/hooks/useCards"; 
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";
import { addTransaction } from "@/services/getTransactions"; 
import dayjs from "dayjs";

const StepTwo = ({ serviceData, handleBackStep, handleNextStep,handleSelectCardInStepThree  }) => {
  const { name, invoice_value } = serviceData;
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); 
  const { token } = useAuth();
  const date = new Date();
  const formattedDate = dayjs(date).toISOString();
  
  
  const account_id = accountData?.id;
  const { cards } = useCards(account_id); 

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token, account_id]);

  const handleSelectCard = (card) => {
    setSelectedCard(card); 
    handleSelectCardInStepThree(card);
  };

  const handlePayment = async () => {
    if (!selectedCard) {
      alert("Por favor, selecciona una tarjeta para continuar.");
      return;
    }

   
    const transactionData = {
      amount: -Math.abs(invoice_value),
      dated: formattedDate,
      destination: "string",
      origin: accountData.cvu
    }

    try {
     
      await addTransaction(account_id, transactionData, token);

    
      handleNextStep();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    }
  };

  return (
    <main className="bg-color-gray flex flex-col gap-2 p-4">
      <article className="bg-color-darker rounded-lg drop-shadow-lg flex flex-col gap-4 p-4 tablet:p-8">
        <div className="flex justify-between">
          <h1 className="text-color-primary font-bold text-[24px]">{name}</h1>
          <button className="underline text-white text-[16px]">Ver detalles del pago</button>
        </div>
        <div className="border-t flex justify-between pt-4">
          <h1 className="text-white font-bold tablet:text-[32px]">Total a pagar</h1>
          <h1 className="text-white font-bold tablet:text-[32px]">${invoice_value}</h1>
        </div>
      </article>

      <article className="bg-white p-6 rounded-lg drop-shadow-lg">
        <h2 className="border-b font-bold pb-2 tablet:text-[24px]">Tus tarjetas</h2>
        <div className="flex flex-col gap-4">
          {cards?.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className="flex justify-between border-b p-2 cursor-pointer"
                onClick={() => handleSelectCard(card)}
              >
                <div className="flex gap-4">
                  <div className="rounded-full h-6 w-6 bg-color-primary"></div>
                  <h2 className="font-thin text-[16px] tablet:text-[18px]">
                    Terminada en {card.cod.toString().slice(-4)}
                  </h2>
                </div>
                <span
                  className={`text-[16px] ${
                    selectedCard?.id === card.id ? "text-color-primary" : ""
                  }`}
                >
                  {selectedCard?.id === card.id ? "Seleccionada" : "Seleccionar"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay tarjetas asociadas a esta cuenta</p>
          )}
        </div>
      </article>

      <div className="flex justify-end">
        <button
          className="bg-color-primary rounded-lg text-color-darker w-fit px-10 py-4 drop-shadow-lg"
          onClick={handlePayment} 
        >
          Pagar
        </button>
      </div>
    </main>
  );
};

export default StepTwo;
