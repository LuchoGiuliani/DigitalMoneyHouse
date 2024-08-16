"use client"

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'

const LeftSidebar = () => {
   const {logout} = useAuth()
 

  return (
    <main className='flex flex-col h-screen bg-color-primary w-fit p-4 gap-2'>
        <Link href="/dashboard">Inicio</Link>
        <Link href="/dashboard/activity">Actividad</Link>
        <Link href="/dashboard/profile">Tu perfil</Link>
        <Link href="">Cargar dinero</Link>
        <Link href="">Pagar servicios</Link>
        <Link href="/dashboard/cards">Tarjetas</Link>
        <button className='text-start' onClick={logout} >Cerrar sesión</button> 
    </main>
  )
}

export default LeftSidebar