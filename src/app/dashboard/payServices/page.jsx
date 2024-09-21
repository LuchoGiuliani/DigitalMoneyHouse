"use client";
import getServices from "@/services/getServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { service } from "@/constants/services";
import { useSimpleFilter } from "@/hooks/useFilter";
import getServicesById from "@/services/getServicesById";
import StepOne from "@/components/PayServices/StepOne";
import StepTwo from "@/components/PayServices/StepTwo"; // Importa StepTwo para su uso
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm(); // Inicializa react-hook-form aquí
  const [services, setServices] = useState([]); // Lista de servicios
  const [selectedService, setSelectedService] = useState(null); // Estado del servicio seleccionado
  const [step, setStep] = useState(0); // Estado para controlar los pasos del flujo
  const { filteredList, searchInput, handleSearchInputChange } = useSimpleFilter(
    services,
    "name"
  );

  useEffect(() => {
    getServices(setServices); // Obtener la lista de servicios desde el backend
  }, []);

  const handleSelectService = async (id) => {
    try {
      const serviceData = await getServicesById(id); // No pases setSelectedService, solo espera los datos
      if (serviceData) {
        setSelectedService(serviceData); // Aquí actualizas el estado de selectedService
        setStep(1); // Cambia al paso 1 (StepOne)
      }
    } catch (error) {
      console.error("Error al seleccionar el servicio:", error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1); // Incrementa el paso cuando se avanza
  };

  const handleBackStep = () => {
    setStep(step - 1); // Decrementa el paso cuando se retrocede
  };

  return (
    <FormProvider {...methods}> {/* Provee el contexto del formulario a todos los pasos */}
      <div className="bg-color-gray min-h-screen p-8 flex flex-col gap-4">
        {step === 0 && ( // Paso 0: Lista de servicios
          <div className="rounded-lg  flex flex-col gap-4 p-6">
            <div className="flex gap-2 tablet:hidden">
              <Image
                src="/arrowGray.svg"
                width={12}
                height={12}
                className="w-auto h-auto"
                alt="flecha"
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

        {step === 1 && selectedService && ( // Paso 1: Detalles del servicio en StepOne
          <StepOne
            service={selectedService} // Pasa el servicio seleccionado a StepOne
            handleNextStep={handleNextStep} // Pasa la función para avanzar al siguiente paso
          />
        )}

        {step === 2 && selectedService && ( // Paso 2: Confirmación en StepTwo
          <StepTwo
            serviceData={selectedService} // Pasa el servicio seleccionado a StepTwo
            handleNextStep={handleNextStep} // Función para ir al siguiente paso (o finalizar)
            handleBackStep={handleBackStep} // Función para retroceder al paso anterior
          />
        )}
      </div>
    </FormProvider>
  );
};

export default Page;
