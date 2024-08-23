import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import Link from 'next/link'
import React from 'react'

const page = () => {

  
  return (
    <div className='flex min-h-screen'>
     
      <div className='bg-color-gray w-full p-6'> 
          <div className='bg-color-darker p-6 rounded-lg flex flex-col gap-6'>
            <h1 className='text-color-primary font-bold'>Seleccionar tarjetas</h1>
            <div className='bg-white p-4 rounded-lg flex flex-col gap-4 font-bold'>
              <h2>Tarjetas</h2>
              <div className='flex gap-4 items-center'>
                <div className='bg-color-primary w-4 h-4 rounded-full'></div>
                <Link href={"./optionB/stepOne"} className='font-semibold'>Terminada en 0000</Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default page