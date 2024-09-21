"use client";
import React from "react";
import { createUser } from "@/services/createUser";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { registerValidator } from "@/schemas/register";

const Page = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerValidator),
    defaultValues: {
      firstname: "",
      lastname: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createUser({ ...data, dni: Number(data.dni) });
      reset();
      if (response) {
        router.push("/register/registerSuccess");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
     
    }
  };

  return (
    <section className="min-h-screen bg-color-darker">
      <div className="flex flex-col  gap-6 p-4 justify-center items-center min-h-screen  ">
        <h1 className="text-white text-center">Crear Cuenta</h1>

        <form
          className="flex flex-col w-fit  justify-center items-center gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 md:grid grid-cols-2">
            <div className="flex flex-col">
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="text"
                  placeholder="Nombre*"
                  {...field}
                />
              )}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
            </div>
            <div className="flex flex-col">
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="text"
                  placeholder="Apellido*"
                  {...field}
                />
              )}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Controller
              name="dni"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="text"
                  placeholder="DNI*"
                  {...field}
                />
              )}
            />
            {errors.dni && (
              <p className="text-red-500 text-sm">{errors.dni.message}</p>
            )}
            </div>
            <div className="flex flex-col">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="text"
                  placeholder="Correo electrónico*"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            </div>
          </div>
          <h3 className="text-[16px] text-white font-light max-w-[560px] px-6  ">
            Usa entre 6 y 20 caracteres, debe contener al menos 1 carácter
            especial, una mayúscula y un número.
          </h3>
          <div className="flex flex-col gap-6 md:grid grid-cols-2">
          <div className="flex flex-col">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="password"
                  placeholder="Contraseña*"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            </div>
            <div className="flex flex-col">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="password"
                  placeholder="Confirmar Password*"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm focus:outline-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
            </div>
            <div className="flex flex-col">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  className="rounded-md max-w-[300px] p-2 w-full"
                  type="text"
                  placeholder="Teléfono*"
                  {...field}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
            </div>
            <button
              className="bg-color-primary rounded-md text-center max-w-[300px] w-full max-h-[50px]"
              type="submit"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
