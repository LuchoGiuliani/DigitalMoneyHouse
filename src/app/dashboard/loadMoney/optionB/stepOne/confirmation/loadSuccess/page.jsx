import Image from "next/image";
import Link from "next/link";
import React from "react";
import check from "../../../../../../../../public/checkBlack.svg";

const page = () => {
  return (
    <div className="bg-color-gray w-full min-h-screen flex flex-col gap-4 p-8 ">
      <div className="bg-color-primary rounded-lg flex justify-center items-center flex-col gap-4 p-6 ">
        <Image
          src={check}
          width={60}
          height={60}
          alt="search"
          className="max-w-[44px] max-h-[40px]"
        />
        <h1 className="font-bold">Ya cargamos el dinero en tu cuenta</h1>
      </div>
      <div className="bg-color-darker py-4 px-8 flex flex-col gap-4 w-full rounded-lg drop-shadow-lg h-fit ">
        <div className="flex flex-col ">
          <h2 className="text-color-gray font-semibold">
            17 de agosto 2022 a 16:34hs
          </h2>
          <h2 className="text-color-primary">$1.233,23</h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-color-gray text-[16px] font-thin">Para</h2>
          <h2 className="text-color-primary font-semibold">Cuenta propia</h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-color-gray text-[16px] font-thin">Brubank</h2>
          <h2 className="text-color-gray">cvu 0923845478375463782</h2>
        </div>
      </div>
      <div className="flex  gap-4 justify-end">
        <button className="bg-gray-300 rounded-lg drop-shadow-lg p-2 font-semibold">
          Ir al inicio
        </button>
        <button className=" bg-color-primary rounded-lg drop-shadow-lg p-2 font-semibold">
          Descargar comprobante
        </button>
      </div>
    </div>
  );
};

export default page;
