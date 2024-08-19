"use client"

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const LeftSidebar = () => {
  const { logout } = useAuth()
  const pathname = usePathname()

  return (
    <main className='flex flex-col h-screen bg-color-primary w-fit min-w-[320px] p-4 gap-2'>
      <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>
        Inicio
      </Link>
      <Link href="/dashboard/activity" className={pathname === '/dashboard/activity' ? 'font-bold' : ''}>
        Actividad
      </Link>
      <Link href="/dashboard/profile" className={pathname === '/dashboard/profile' ? 'font-bold' : ''}>
        Tu perfil
      </Link>
      <Link href="/dashboard/loadMoney" className={pathname === '/dashboard/loadMoney' ? 'font-bold' : ''}>
        Cargar dinero
      </Link>
      <Link href="/dashboard/payServices" className={pathname === '/dashboard/payServices' ? 'font-bold' : ''}>
        Pagar servicios
      </Link>
      <Link href="/dashboard/cards" className={pathname === '/dashboard/cards' ? 'font-bold' : ''}>
        Tarjetas
      </Link>
      <button className='text-start' onClick={logout}>
        Cerrar sesión
      </button> 
    </main>
  )
}

export default LeftSidebar
