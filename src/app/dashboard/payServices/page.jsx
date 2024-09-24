"use client";
import getServices from "@/services/getServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { service } from "@/constants/services";
import { useSimpleFilter } from "@/hooks/useFilter";
import getServicesById from "@/services/getServicesById";
import StepOne from "@/components/PayServices/StepOne";
import StepTwo from "@/components/PayServices/StepTwo";
import StepThree from "@/components/PayServices/StepThree"; 
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null); 
  const [step, setStep] = useState(0); 
  const [selectedCard, setSelectedCard] = useState(null);
  const { filteredList, searchInput, handleSearchInputChange } = useSimpleFilter(
    services,
    "name"
  );

  useEffect(() => {
    getServices(setServices); 
  }, []);

  const handleSelectService = async (id) => {
    try {
      const serviceData = await getServicesById(id);
      if (serviceData) {
        setSelectedService(serviceData); 
        setStep(1); 
      }
    } catch (error) {
      console.error("Error selecting service:", error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1); 
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };
  const handleSelectCardInStepThree = (card) => {
    setSelectedCard(card); 
  };

  return (
    <FormProvider {...methods}> 
      <div className="bg-color-gray min-h-screen tablet:p-8 flex flex-col gap-4">
        {step === 0 && ( 
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
                            <h1 className="font-semibold text-[18px]">{sv.name}</h1>
                          </div>
                          <button
                            className="text-[16px] tablet:text-[18px]"
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

        {step === 1 && selectedService && (
          <StepOne
            service={selectedService} 
            handleNextStep={handleNextStep} 
          />
        )}

        {step === 2 && selectedService && ( 
          <StepTwo
            serviceData={selectedService} 
            handleNextStep={handleNextStep} 
            handleBackStep={handleBackStep} 
            handleSelectCardInStepThree={handleSelectCardInStepThree}
          />
        )}

        {step === 3 && selectedService && ( 
          <StepThree
            card={selectedCard} 
            serviceData={selectedService} 
            handleNextStep={handleNextStep} 
            handleBackStep={handleBackStep}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default Page;
