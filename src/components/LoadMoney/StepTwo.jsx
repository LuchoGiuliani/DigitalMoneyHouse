import Image from 'next/image';
import React from 'react'
import {useFormContext} from "react-hook-form";

const StepTwo = ({cvu, handleBackStep, handleSubmit}) => {

    const {getValues} = useFormContext();

  return (
    <section className="w-full p-5 flex flex-col gap-9 rounded-lg bg-black-primary shadow-md md:p-10 xl:pt-10 xl:pl-16 xl:pr-11 xl:pb-11">
    <h2 className="text-lg text-primary font-semibold text-color-primary">
        Revisá que está todo bien
    </h2>
    <div className="flex items-end justify-between text-white">
        <div className="pb-7">
            <div className="mb-9">
                <div className="flex items-center gap-4 mb-2">
                    <p className="font-normal text-base">Vas a transferir</p>
                    <Image alt="imagen" src={"/copyPen.svg"} width={12} height={12} className="w-auto h-auto cursor-pointer" onClick={handleBackStep} />
                </div>
                <p className="font-bold text-base">
                  {(getValues("amount"))}
                </p>
            </div>
            <div className="mb-6">
                <p className="font-normal text-base mb-2">Para</p>
                <p className="font-bold text-lg">Cuenta propia</p>
            </div>
            <div>
                <p className="font-normal text-base mb-2">Brubank</p>
                <p className="font-normal text-base">CVU {cvu}</p>
            </div>
        </div>
        <button
            type="submit"
            onClick={handleSubmit}
            className="bg-color-primary p-4 rounded-lg text-black font-semibold w-full xl:w-64 ">
            Continuar
        </button>
    </div>
</section>
  )
}

export default StepTwo