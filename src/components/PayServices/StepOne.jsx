import React from "react";
import { useFormContext } from "react-hook-form";

const StepOne = ({ service, handleNextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext(); 

  const onSubmit = (data) => {
  
    handleNextStep(); 
  };

  return (
    <main className="bg-color-gray px-4 py-4 tablet:px-16 tablet:py-8">
      <div className="bg-color-darker rounded-lg tablet:p-12 flex flex-col tablet:gap-6">
        <h1 className="text-color-primary font-bold text-[16px] tablet:text-[32px] p-4">
          Número de cuenta sin el primer 2
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 ">
          <div className="flex flex-col w-fit gap-2">
          <input
          className="rounded-lg p-2 text-color-darker "
            type="text"
            placeholder="239901237482"
            {...register("accountNumber", { 
              required: "El número de cuenta es obligatorio", 
              minLength: { value: 11, message: "Debe tener 11 dígitos" }
            })}
          />
          {errors.accountNumber && (
            <p className="text-red-500">{errors.accountNumber.message}</p>
          )}
          <p className="text-[14px] text-white font-thin">
            Son 11 números sin espacios, sin el "2" inicial. Agregá ceros adelante si tenés menos.
          </p>
          </div>
          <div className="flex justify-center p-4  tablet:justify-end">
          <button
            type="submit"
            className="bg-color-primary rounded-lg text-color-darker font-semibold  w-fit p-4 "
          >
            Continuar
          </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default StepOne;
