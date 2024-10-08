"use client";
import React from "react";
import LoginForm from "@/components/LoginForm/LoginForm";

const page = () => {
  return (
    <div className="h-screen bg-color-darker">
      <section className="flex flex-col min-h-screen items-center justify-center p-4 gap-4">
        <div>
          <h1 className="text-center p-2 text-white font-bold text-[20px]">
            ¡Hola! Ingresá tu e-mail!
          </h1>
          <div>
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
