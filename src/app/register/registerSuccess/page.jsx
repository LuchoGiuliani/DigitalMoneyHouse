import React from 'react'

import Image from 'next/image'
import Link from 'next/link'


const RegisterSuccess = () => {
  return (
    <div className="h-screen bg-color-darker flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <Image 
          src="/RegistroExitoso.png" 
          alt="Registro Exitoso" 
          width={500} 
          height={500} 
        />
        <Link className="w-fit p-2 mt-4 rounded-md bg-color-primary" href="/login" passHref>
          Continuar
        </Link>
      </div>
  
    </div>
  )
}

export default RegisterSuccess
