"use client"
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import { useAuth } from '@/hooks/useAuth'
import getAccountActivity from '@/services/getAccountActivity'
import Image from 'next/image'
import dayjs from 'dayjs' 
import 'dayjs/locale/es'
import React, { useEffect, useState } from 'react'
dayjs.locale('es')
const page = () => {
  const { token } = useAuth()
  const [accountData, setAccountData] = useState([])
  const [accountActivity, setAccountActivity] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  console.log("accountData", accountData)
  console.log("accountActivity", accountActivity)

  useEffect(() => {
    if (token) {
      getAccountActivity(setAccountData, setAccountActivity, token) 
    }
  }, [token])

  // Obtener los datos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = accountActivity.slice(indexOfFirstItem, indexOfLastItem)


  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <main className="bg-color-gray">
      <section className="flex">
        <LeftSidebar />
        <div className='p-10 w-full flex flex-col gap-4'>
          <div className='flex w-full gap-4'>
            <div className='bg-white w-full p-2 flex gap-2 rounded-lg drop-shadow-lg'>
              <Image src={"/search.png"} width={12} height={0} className='w-auto h-auto' alt='search' />
              <h1 className='text-gray-400'>Buscar en tu actividad</h1>
            </div>
            <button className='bg-color-primary p-2 rounded-lg drop-shadow-lg min-w-[164px] flex gap-2 items-center font-semibold'>
              Filtrar
              <Image src={"/filter.png"} width={12} height={0} className='w-auto h-auto' alt='search' />
            </button>
          </div>
          <div className='w-full h-full bg-white rounded-lg drop-shadow-lg p-4'>
            <h2 className='font-bold pb-6'>Tu actividad</h2>
            {currentItems.map((activity, index) => (
              <div key={index} className="flex justify-between items-start border-y py-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-lime-500"></div>
              
                    {activity.type === 'Transfer' && activity.origin === accountData.cvu ? (
                      <p className="font-semibold">Transferiste a {activity.destination}</p>
                    ) : (
                      <p className="font-semibold">Ingresaste dinero</p>
                    )}
                   
                  
                </div>
                <div className='flex  flex-col'>
                <p className="font-semibold text-right">
                  {activity.type === 'Transfer' && activity.origin === accountData.cvu ? (
                    <>-${activity.amount.toFixed(2)}</>
                  ) : (
                    <>+${activity.amount.toFixed(2)}</>
                  )}
                </p>
                <p className="text-gray-500 text-sm">{dayjs(activity.dated).format('dddd')}</p>
              </div>
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(accountActivity.length / itemsPerPage) }).map((_, i) => (
              <button 
                key={i} 
                className={`px-3 py-1 border ${currentPage === i + 1 ? 'bg-gray-200' : ''}`} 
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
