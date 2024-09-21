"use client"

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const LeftSidebar = () => {
  const { logout } = useAuth()
  const pathname = usePathname()

  

  return (
    <main className='tablet:flex flex-col min-h-screen bg-color-primary w-fit min-w-[276px] tablet:p-[40px] gap-2 hidden '>
      <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>
        Inicio
      </Link>
      <Link href="/dashboard/activity" className={pathname.startsWith('/dashboard/activity') ? 'font-bold' : ''}>
        Actividad
      </Link>
      <Link href="/dashboard/profile" className={pathname === '/dashboard/profile' ? 'font-bold' : ''}>
        Tu perfil
      </Link>
      <Link href="/dashboard/loadMoney" className={pathname.startsWith('/dashboard/loadMoney')  ? 'font-bold' : ''}>
        Cargar dinero
      </Link>
      <Link href="/dashboard/payServices" className={pathname.startsWith('/dashboard/payServices')  ? 'font-bold' : ''}>
        Pagar servicios
      </Link>
      <Link href="/dashboard/cards" className={pathname.startsWith('/dashboard/cards')  ? 'font-bold' : ''}>
        Tarjetas
      </Link>
      <button className='text-start' onClick={logout}>
        Cerrar sesión
      </button> 
    </main>
  )
}

export default LeftSidebar
