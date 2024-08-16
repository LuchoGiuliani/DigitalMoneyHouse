"use client";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import React, { useState , useEffect} from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useRouter } from "next/navigation";
import { addCard } from "@/services/getCards";
import { useAuth } from "@/hooks/useAuth";
import getAccountId from "@/services/getAccountId";



const Page = () => {
    const router = useRouter();
    const { token } = useAuth();
    const [account_id, setAccountId] = useState(null);
  
    useEffect(() => {
      const fetchAccountId = async () => {
        if (token) {
          const id = await getAccountId(token);
          setAccountId(id);
        }
      };
  
      fetchAccountId();
    }, [token]);
  
    console.log("account_id", account_id);
  
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
          cod: 0,
          expiration_date: "08/2025",  // Asegúrate de enviar la fecha de expiración correcta
          first_last_name: state.name,
          number_id: 0,        // Asegúrate de enviar el número correcto
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
      <div className="flex">
        <LeftSidebar />
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
                placeholder="Numero de tarjeta"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="p-4 rounded-md drop-shadow-lg"
              />
              <input
                type="text"
                name="expiry"
                placeholder="Fecha de vencimiento"
                value="08/2025"
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
                placeholder="Codigo de seguridad"
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
