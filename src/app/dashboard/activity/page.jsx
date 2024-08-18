import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import Image from 'next/image'

import React from 'react'

const page = () => {
  return (
    <main className="bg-color-gray">
      <section className="flex">
        <LeftSidebar />
        <div className='p-10 w-full flex  flex-col gap-4'>
          <div className='flex w-full gap-4'>
          <div className='bg-white w-full p-2 flex gap-2 rounded-lg drop-shadow-lg'>
            <Image src={"/search.png"} width={12} height={0} className='w-auto h-auto' alt='search'   />
            <h1 className='text-gray-400'>Buscar en tu actividad</h1>
          </div>
          <button className='bg-color-primary p-2 rounded-lg drop-shadow-lg min-w-[164px] flex gap-2 items-center font-semibold'>
             Filtrar
             <Image  src={"/filter.png"} width={12} height={0} className='w-auto h-auto' alt='search'  />
          </button>
          </div>
          <div className='w-full h-full bg-white rounded-lg drop-shadow-lg p-2'>
            Activity
          </div>

        </div>
      </section>
    </main>
  )
}

export default page