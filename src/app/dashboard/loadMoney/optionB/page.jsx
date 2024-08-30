"use client"
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import { useAuth } from '@/hooks/useAuth';
import useCards from '@/hooks/useCards';
import getAccountActivity from '@/services/getAccountActivity';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
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
    <div className='flex min-h-screen'>
     
      <div className='bg-color-gray w-full p-6'> 
          <div className='bg-color-darker p-6 rounded-lg flex flex-col gap-6'>
            <h1 className='text-color-primary font-bold'>Seleccionar tarjetas</h1>
            <div className='bg-white p-4 rounded-lg flex flex-col gap-4 font-bold'>
              <h2>Tarjetas</h2>
              <div className='flex flex-col gap-4 '>
                
            {cards?.length > 0 ? (
              cards?.map((card) => (
                <div
                  key={card.id}
                  className="flex justify-between border-b p-2"
                >
                  <div className="flex gap-4">
                    <div className="rounded-full h-6 w-6 bg-color-primary"></div>
                    <h2>Terminada en {card.cod.toString().slice(-4)}</h2>
                  </div>
                  <Link
                    className="font-semibold"
                   href={"/dashboard/loadMoney/optionB/stepOne"}
                  >
                    Seleccionar
                  </Link>
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
    </div>
  )
}

export default page