import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs"; // Importa dayjs si lo estás usando, si no, usa .toLocaleDateString()

const StepThree = ({ cvu }) => {
  const { getValues } = useFormContext();
  const date = new Date(); // Objeto Date actual
  const formattedDate = dayjs(date).format('DD/MM/YYYY'); // Formateo usando dayjs
  // Alternativa sin dayjs: const formattedDate = date.toLocaleDateString(); 

  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <section className="flex flex-col gap-5 text-white ">
      <div className="w-full flex flex-col gap-3 items-center justify-center bg-primary py-4 rounded-lg bg-color-primary">
        <Image src={"/checkBlack.svg"} width={12} height={12} className="fill-black w-auto h-auto" alt="imagen" />
        <h2 className="text-xl text-black font-bold">
          Ya cargamos el dinero en tu cuenta
        </h2>
      </div>
      <div className="bg-black-primary p-5 xl:pt-9 xl:pl-16 xl:pb-11 rounded-lg">
        <div className="flex flex-col gap-2 mb-8">
         
          <p className="text-white font-normal">{formattedDate}</p>
          <span className="font-bold text-base text-color-primary">
            ${getValues("amount")}
          </span>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className=" font-normal">Para</p>
          <p className="font-bold text-lg text-color-primary">Cuenta propia</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Brubank</p>
          <p>CVU {cvu}</p>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <button
          type="button"
          className="bg-gray-300 text-black rounded-lg w-full xl:w-60"
          onClick={handleBackToDashboard}
        >
          Ir al inicio
        </button>
        <button
          type="button"
          className="bg-color-primary rounded-lg drop-shadow-lg text-black p-4 w-full xl:w-60"
        >
          Descargar comprobante
        </button>
      </div>
    </section>
  );
};

export default StepThree;
