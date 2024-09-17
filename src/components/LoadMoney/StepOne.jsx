import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const StepOne = ({ handleNextStep }) => {
  const { control } = useFormContext();
  return (
    <section className="flex min-h-fit">
      <div className="bg-color-darker p-8 rounded-lg flex flex-col gap-2 w-full ">
        <h1 className="text-color-primary font-bold text-[24px]">
          ¿Cuánto quéres ingresar a la cuenta?
        </h1>
        <div className="w-[360px] p-5 flex flex-row gap-2 items-center rounded-lg bg-white text-black mt-11">
          <span className="text-md text-black/50">$</span>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="$0.00"
                className="bg-transparent text-md text-black/50 font-normal"
              />
            )}
          />
        </div>
        <div className="mt-9 w-full flex justify-end">
          <button
            onClick={handleNextStep}
            className="bg-primary hover:bg-primary-dark focus:outline-2 focus:outline-primary w-full xl:w-60 bg-gray-300 hover:bg-gray-200 p-4 rounded-lg "
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
