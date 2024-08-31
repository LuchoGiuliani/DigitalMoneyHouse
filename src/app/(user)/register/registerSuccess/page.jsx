import React from 'react'

import Image from 'next/image'
import Link from 'next/link'


const RegisterSuccess = () => {
  return (
    <div className="h-screen bg-color-darker flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-center flex-grow  gap-4">
        <h1 className='text-white font-bold text-4xl'>Registro exitoso</h1>
        <Image 
          src="/checkGreen.svg" 
          alt="Registro Exitoso" 
          width={12} 
          height={12} 
          className='h-auto w-auto'
        />
        <p className='text-white text-[18px] text-center max-w-[450px]'>Hemos enviado un correo de confirmación para validar tu email, por favor revisalo para iniciar sesión.</p>
        <Link className="w-fit p-2 mt-4 rounded-md bg-color-primary" href="/login" passHref>
          Continuar
        </Link>
      </div>
  
    </div>
  )
}

export default RegisterSuccess
