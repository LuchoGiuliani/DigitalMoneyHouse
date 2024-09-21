import React, { useEffect, useState } from "react";
import useCards from "@/hooks/useCards"; // Hook para traer las tarjetas
import { useAuth } from "@/hooks/useAuth";
import getAccountActivity from "@/services/getAccountActivity";

const StepTwo = ({ serviceData, handleBackStep, handleNextStep }) => {
  const { name, invoice_value } = serviceData;
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const { token } = useAuth();
  
  
  
  const account_id = accountData?.id;
  
  const { cards } = useCards(account_id); // Hook que trae las tarjetas asociadas
  console.log(cards);

 useEffect(() => {
   if (token) {
     getAccountActivity(setAccountData, setAccountActivity, token);
   }
 }, [token, account_id]);

  const handleSelectCard = (card) => {
    // Al seleccionar una tarjeta, pasa al siguiente paso
    handleNextStep();
  };

  return (
    <main className="bg-color-gray flex flex-col gap-2">
      <article className="bg-color-darker rounded-lg drop-shadow-lg flex flex-col gap-4 tablet:p-[50px]">
        <div className=" flex justify-between  ">
          <h1 className="text-color-primary font-bold text-[24px]">{name}</h1>
          <button className="underline text-white">Ver detalles del pago</button>
        </div>
        <div className="border-t flex  justify-between pt-4">
          <h1 className="text-white font-bold text-[32px] ">Total a pagar</h1>
          <h1 className="text-white font-bold text-[32px]">${invoice_value}</h1>
        </div>
      </article>

      <article className="bg-white p-6 rounded-lg drop-shadow-lg">
        <h2 className="border-b font-bold pb-2">Tus tarjetas</h2>
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
                  <h2 className="font-thin">Terminada en {card.cod.toString().slice(-4)}</h2>
                </div>
                <span className="font-semibold">Seleccionar</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay tarjetas asociadas a esta cuenta</p>
          )}
        </div>
      </article>
<div className="flex justify-end">
      <button className="bg-color-primary rounded-lg text-color-darker w-fit px-10  py-4 drop-shadow-lg" onClick={handleNextStep}>
        Pagar
      </button>
      </div>
    </main>
  );
};

export default StepTwo;
