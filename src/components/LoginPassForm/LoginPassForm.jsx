"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginScheme from "@/schemas/login.scheme";
import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useEmail } from "@/context/emailContext";
import { useAuth } from "@/hooks/useAuth";
import { loginUser, fetchUserAccount } from "@/services/getTokenAccountId";
import { useUser } from "@/context/userContext";

const LoginPassForm = () => {
  const { setToken } = useAuth();
  const { email } = useEmail();
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const { user_id, setUserId } = useUser();

  const methods = useForm({
    resolver: yupResolver(LoginScheme),
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const loginResponse = await loginUser(data);
      const token = loginResponse.token;

      window.localStorage.setItem("token", JSON.stringify(token));
      setToken(token);

      const userData = await fetchUserAccount(token);
      setUserId(userData.user_id);
      window.localStorage.setItem("user_id", JSON.stringify(userData.user_id));
      window.localStorage.setItem("account_id", JSON.stringify(userData.id));

      router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
      setServerError("Ha ocurrido un error. Intente más tarde.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...methods.register("email")}
          placeholder="Correo electrónico"
          type="email"
          autoComplete="off"
          defaultValue={email}
          style={{ display: "none" }}
        />
        <input
          {...methods.register("password")}
          placeholder="Contraseña"
          type="password"
          autoComplete="current-password"
          className="p-2 rounded-md"
        />
        <button className="p-2 rounded-md bg-color-primary" type="submit">
          Ingresar
        </button>
        {serverError && (
          <div className="text-red-600 italic">{serverError}</div>
        )}
      </form>
    </FormProvider>
  );
};

export default LoginPassForm;
