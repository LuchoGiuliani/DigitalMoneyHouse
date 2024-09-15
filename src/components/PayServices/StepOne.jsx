import React from "react";

const StepOne = () => {
  return (
    <main className="bg-color-gray">
      <div className="bg-color-darker rounded-lg">
        <h1 className="text-color-primary font-bold text-[24px] mobile:text-[32px]">
          Número de cuenta sin el primer 2
        </h1>
        <input type="text" placeholder="239901237482" />
        <p className="text-[14px]">
          Son 11 números sin espacios, sin el "2" inicial. Agregá ceros adelante
          si tenés menos.
        </p>
        <button className="bg-color-primary rounded-lg text-color-darker font-semibold">
          Continuar
        </button>
      </div>
    </main>
  );
};

export default StepOne;
