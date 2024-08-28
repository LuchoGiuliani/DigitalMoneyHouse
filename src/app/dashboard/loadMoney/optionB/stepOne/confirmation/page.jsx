import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-color-gray w-full min-h-screen flex flex-col gap-4 p-8 ">
      <div className="bg-color-darker py-4 px-8 flex flex-col gap-4 w-full rounded-lg drop-shadow-lg h-fit ">
        <div className="border-b flex justify-between pb-2">
          <h2 className="text-color-primary font-bold">
            Revisá que esté todo bien
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-color-gray font-semibold">Vas a transferir</h2>
          <h2 className="text-color-gray">$1.233,23</h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-color-gray text-[16px] font-thin">Para</h2>
          <h2 className="text-color-gray font-semibold">Cuenta propia</h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-color-gray text-[16px] font-thin">Brubank</h2>
          <h2 className="text-color-primary">cvu 0923845478375463782</h2>
        </div>
        <div className="flex  gap-4 justify-end">
          <Link href={"./confirmation/loadSuccess"} className=" bg-color-primary rounded-lg drop-shadow-lg p-2">
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
