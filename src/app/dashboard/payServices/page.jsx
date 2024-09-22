"use client";
import getServices from "@/services/getServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { service } from "@/constants/services";
import { useSimpleFilter } from "@/hooks/useFilter";
import getServicesById from "@/services/getServicesById";
import StepOne from "@/components/PayServices/StepOne";
import StepTwo from "@/components/PayServices/StepTwo";
import StepThree from "@/components/PayServices/StepThree"; // Import StepThree
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm(); // Initialize react-hook-form here
  const [services, setServices] = useState([]); // Service list
  const [selectedService, setSelectedService] = useState(null); // Selected service state
  const [step, setStep] = useState(0); 
  const [selectedCard, setSelectedCard] = useState(null);
  const { filteredList, searchInput, handleSearchInputChange } = useSimpleFilter(
    services,
    "name"
  );

  useEffect(() => {
    getServices(setServices); // Fetch the list of services from the backend
  }, []);

  const handleSelectService = async (id) => {
    try {
      const serviceData = await getServicesById(id);
      if (serviceData) {
        setSelectedService(serviceData); // Update selected service state
        setStep(1); // Move to StepOne
      }
    } catch (error) {
      console.error("Error selecting service:", error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1); // Go to the next step
  };

  const handleBackStep = () => {
    setStep(step - 1); // Go to the previous step
  };
  const handleSelectCardInStepThree = (card) => {
    setSelectedCard(card); // Almacena la tarjeta seleccionada para usarla en StepThree
  };

  return (
    <FormProvider {...methods}> {/* Provide form context to all steps */}
      <div className="bg-color-gray min-h-screen p-8 flex flex-col gap-4">
        {step === 0 && ( // Step 0: Service List
          <div className="rounded-lg flex flex-col gap-4 p-6">
            <div className="flex gap-2 tablet:hidden">
              <Image
                src="/arrowGray.svg"
                width={12}
                height={12}
                className="w-auto h-auto"
                alt="arrow"
              />
              <h3 className="underline text-color-dark">Pagar servicio</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-white text-gray-300 p-2 drop-shadow-lg">
                <input
                  type="text"
                  placeholder="Buscar en tu actividad"
                  className="flex-grow pl-2 py-1 text-base border-none focus:border-none focus-visible:outline-none text-black"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="rounded-lg bg-white flex flex-col gap-4 p-6 drop-shadow-lg">
                <h2 className="font-bold pb-4 border-b">Más recientes</h2>

                <div className="flex gap-2 justify-between border-b pb-2">
                  <div className="flex flex-col gap-2 w-full">
                    {filteredList && filteredList.length > 0 ? (
                      filteredList.map((sv) => (
                        <div
                          key={sv.id}
                          className="flex justify-between border-b py-2"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={service[sv.id]?.src || ""}
                              width={24}
                              height={24}
                              className="w-[46px] h-[24px]"
                              alt={service[sv.id]?.alt || "Servicio"}
                            />
                            <h1>{sv.name}</h1>
                          </div>
                          <button
                            className="font-bold"
                            onClick={() => handleSelectService(sv.id)}
                          >
                            Seleccionar
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No se encontraron servicios.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && selectedService && ( // Step 1: Service Details in StepOne
          <StepOne
            service={selectedService} // Pass the selected service to StepOne
            handleNextStep={handleNextStep} // Pass the function to move to the next step
          />
        )}

        {step === 2 && selectedService && ( // Step 2: Confirmation in StepTwo
          <StepTwo
            serviceData={selectedService} // Pass the selected service to StepTwo
            handleNextStep={handleNextStep} // Function to go to the next step (or finish)
            handleBackStep={handleBackStep} // Function to go back to the previous step
            handleSelectCardInStepThree={handleSelectCardInStepThree}
          />
        )}

        {step === 3 && selectedService && ( // Step 3: Final Confirmation in StepThree
          <StepThree
            card={selectedCard} 
            serviceData={selectedService} // Pass the selected service to StepThree
            handleNextStep={handleNextStep} // Function to finalize or move forward
            handleBackStep={handleBackStep} // Function to go back to StepTwo
          />
        )}
      </div>
    </FormProvider>
  );
};

export default Page;
