import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import LoginScheme from "@/schemas/login.scheme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useEmail} from "@/context/emailContext"
import Link from "next/link";

const LoginForm = (email) => {

    const router = useRouter();
    const [serverError, setServerError] = useState(null);
    const methods = useForm({
        resolver: yupResolver(LoginScheme)
    });
    const { handleSubmit, formState: { errors } } = methods; 
    const { setEmail } = useEmail();

    const onSubmit = (data) => {
        setEmail(data.email); 
    
        
        router.push('/login/loginPassword');
    }

    return (
    <FormProvider {...methods}>
  <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
    <input
      {...methods.register("email")}
      placeholder="Correo electrónico"
      type="email"
      autoComplete="off"
      className={`rounded-md p-2 ${errors.email ? "border border-red-600" : "border border-gray-300"}`}
    />
    {errors.email && (
      <p className="text-red-600 italic">{errors.email.message}</p>
    )}
    <button className="w-full p-2 rounded-md bg-color-primary font-semibold" type="submit">
      Continuar
    </button>
    <Link href="/register" className="w-full text-center p-2 rounded-md bg-[#CECECE] font-semibold">
      Crear cuenta
    </Link>
  </form>
</FormProvider>
    );
}

export default LoginForm;
