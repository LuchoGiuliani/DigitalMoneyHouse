"use client";
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import StepOne from '@/components/LoadMoney/StepOne';
import StepThree from '@/components/LoadMoney/StepThree';
import StepTwo from '@/components/LoadMoney/StepTwo';
import { useAuth } from '@/hooks/useAuth';
import useCards from '@/hooks/useCards';
import getAccountActivity from '@/services/getAccountActivity';
import { postDeposit } from '@/services/postDeposit';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";


const Page = () => {
  const [accountData, setAccountData] = useState(null);
  const [accountActivity, setAccountActivity] = useState(null);
  const { token } = useAuth();
  const [step, setStep] = useState(0); // Estado para manejar los pasos
  const [selectedCard, setSelectedCard] = useState(null); // Estado para la tarjeta seleccionada

  const methods = useForm({
    defaultValues: {
      card_id: "",
      amount: 0,
    },
  });

  const account_id = accountData?.id;
  const { cards } = useCards(account_id);
console.log(account_id);

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token);
    }
  }, [token, account_id]);

  const handleNextStep = () => setStep(prevStep => prevStep + 1);
  const handleBackStep = () => setStep(prevStep => prevStep - 1);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
   
    handleNextStep(); // Ir al siguiente paso
  };

  const handleSubmit = async (data) => {
    const {amount } = data
    const amountNumber = parseFloat(amount);
    
    try {
      // Llama a postDeposit pasando todos los parámetros necesarios
      await postDeposit(token, account_id, amountNumber);
      console.log(amount);
      
      handleNextStep(); // Ir al siguiente paso después de enviar los datos
    } catch (error) {
      console.error("Error al enviar el depósito:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-screen'>
        <div className='bg-color-gray w-full p-6'>
          <div className='bg-color-darker p-6 rounded-lg flex flex-col gap-6'>
            <h1 className='text-color-primary font-bold'>
              {step === 0 ? 'Seleccionar tarjetas' : ''}
            </h1>

            {step === 0 && (
              <div className='flex flex-col gap-4 '>
              <div className='bg-white p-4 rounded-lg flex flex-col gap-4 font-bold '>
                <h2>Tarjetas</h2>
                <div className='flex flex-col gap-4 text-[18px] '>
                  {cards?.length > 0 ? (
                    cards?.map((card) => (
                      <div
                        key={card.id}
                        className="flex justify-between border-b p-2 cursor-pointer"
                        onClick={() => handleSelectCard(card)}
                      >
                        <div className="flex gap-4">
                          <div className="rounded-full h-6 w-6 bg-color-primary"></div>
                          <h2 className='font-thin'>Terminada en {card.cod.toString().slice(-4)}</h2>
                        </div>
                        <span className="font-semibold">Seleccionar</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay tarjetas asociadas a esta cuenta</p>
                  )}
                </div>
              </div>
               <Link
               href={"/dashboard/cards/newCard"}
               className="flex gap-4 justify-between"
             >
               <div className="flex gap-4">
                 <Image
                   src={"/cruz.png"}
                   width={22}
                   height={22}
                   alt="Cruz"
                   className="w-auto h-auto"
                 />
                 <h2 className="font-bold text-color-primary">Nueva tarjeta</h2>
               </div>
               
             </Link>
             </div>
            )}

            {step === 1 && <StepOne handleNextStep={handleNextStep} />}
            {step === 2 && <StepTwo cvu={accountData?.cvu} handleBackStep={handleBackStep}  handleSubmit={methods.handleSubmit(handleSubmit)}  />}
            {step === 3 && <StepThree cvu={accountData?.cvu} />}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Page;
