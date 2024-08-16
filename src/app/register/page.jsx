"use client";
import React, { useState } from "react";
import { validarPassword, validateRequiredFields } from "@/validations/validations";
import { createUser } from "@/services/createUser";
import { useRouter } from "next/navigation";

const Page = ({ setUser_id, setUserAccount }) => {
  const [formData, setFormData] = useState({
    dni: 0,
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    phone: 0,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrors({ ...errors, confirmPassword: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateRequiredFields(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { email, password, firstname, lastname, dni, phone } = formData;

    if (!validarPassword(password)) {
      setPasswordError("Contraseña incorrecta.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    const userDataToSend = { email, password, firstname, lastname, dni: Number(dni), phone };

    try {
      const data = await createUser(userDataToSend);
      window.localStorage.setItem("user_id", JSON.stringify(data.user_id));
      window.localStorage.setItem("account_id", JSON.stringify(data.account_id));

     
      router.push("/register/registerSuccess");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "El email ya está registrado." }));
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="min-h-screen bg-color-darker">
    
      <div className="flex flex-col  gap-6 p-4 justify-center items-center min-h-screen  ">
        <h1 className="text-white text-center">Crear Cuenta</h1>
       
        <form
          className="flex flex-col w-fit  justify-center items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6 md:grid grid-cols-2">
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Nombre*"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Apellido*"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="dni"
            value={formData.dni === 0 ? "" : formData.dni}
            onChange={handleChange}
            placeholder="DNI*"
          />
          {errors.dni && (
            <p className="text-red-500 text-sm">{errors.dni}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico*"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
           </div>
          <h3 className="text-[16px] text-white font-light max-w-[560px]  ">
            Usa entre 6 y 20 caracteres, debe contener al menos 1 carácter
            especial, una mayúscula y un número.
          </h3>
          <div className="flex flex-col gap-6 md:grid grid-cols-2">
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña*"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="password"
            placeholder="Confirmar Contraseña*"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="phone"
            value={formData.phone === 0 ? "" : formData.phone}
            onChange={handleChange}
            placeholder="Teléfono*"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
          <button
            className="bg-color-primary rounded-md text-center max-w-[300px] w-full"
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
