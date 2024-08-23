"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from '@/components/LoginForm/LoginForm'



const Page = () => {

  const searchParams = useSearchParams();
  const email = searchParams.get('email');


  return (
    <div className='h-screen bg-color-darker'>
     
      <section className='flex flex-col h-screen items-center justify-center p-4 gap-4'>
        <div>
          <h1 className='text-center p-2 text-white font-bold text-[22px]'>¡Hola! Ingresá tu e-mail!</h1>
          <div>          
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page;
