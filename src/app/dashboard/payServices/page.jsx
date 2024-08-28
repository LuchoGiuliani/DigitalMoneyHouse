import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-color-gray min-h-screen p-8 flex flex-col gap-4">
      <div className="rounded-lg bg-white text-gray-300 p-2">
        Formulario busqueda: Busca entre mas de 5000 empresas
      </div>
      <div className="rounded-lg bg-white flex flex-col gap-4 p-6">
        <h2 className="font-bold pb-4 border-b ">Mas recientes</h2>
        <div className="flex gap-2 justify-between border-b pb-2">
          <div className="flex gap-2">
          <Image
                src={"/logoClaro.svg"}
                width={12}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
            <div>Claro</div>
          </div>
          <div>Seleccionar</div>
        </div>
        <div className="flex gap-2 justify-between border-b pb-2">
          <div className="flex gap-2">
          <Image
                src={"/logoCablevision.svg"}
                width={12}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
            <div>Cablevisión</div>
          </div>
          <div>Seleccionar</div>
        </div>
        <div className="flex gap-2 justify-between border-b pb-2">
          <div className="flex gap-2">
          <Image
                src={"/logoPersonal.svg"}
                width={12}
                height={0}
                className="w-auto h-auto"
                alt="search"
              />
            <div>Personal</div>
          </div>
          <div>Seleccionar</div>
        </div>
      </div>
    </div>
  );
};

export default page;
