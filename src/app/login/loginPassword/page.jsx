

import LoginPassForm from '@/components/LoginPassForm/LoginPassForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div className='h-screen bg-color-darker'>
     
      <section className='flex flex-col h-screen items-center justify-center p-4 gap-4'>
         <div className=''>
          <h1 className='text-center p-2 text-white'>Ingresá tu contraseña</h1>
          <div>
           <LoginPassForm  />
          </div>
         </div>
      </section>
    </div>
  )
}

export default page