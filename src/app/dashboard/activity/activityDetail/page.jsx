import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='bg-color-gray w-full min-h-screen flex flex-col gap-4 p-8 '>
      <div className="flex gap-2 tablet:hidden">
          <Image
           src="/arrowGray.svg"
           width={12}
           height={12}
           className="w-auto h-auto"
           alt="flecha" />
           <h3 className="underline text-color-dark">Inicio</h3>
        </div>
        <div className='bg-color-darker py-4 px-8 flex flex-col gap-4 w-full rounded-lg drop-shadow-lg h-fit '>
          <div className='border-b flex justify-between pb-2'>
            <h2 className='text-color-primary font-bold'>Aprobada</h2>
            <h2 className='text-color-gray'>Creada el 17 de agosto 2023 a las 15:30hs</h2>
          </div>
          <div className='flex flex-col '>
            <h2 className='text-color-gray font-semibold'>Transferencia de dinero</h2>
            <h2 className='text-color-primary'>$1.233,23</h2>
          </div>
          <div className='flex flex-col '>
            <h2 className='text-color-gray text-[16px] font-thin'>Le transferiste a </h2>
            <h2 className='text-color-primary'>Rodrigo Perez</h2>
          </div>
          <div className='flex flex-col '>
            <h2 className='text-color-gray text-[16px] font-thin'>Número de operación</h2>
            <h2 className='text-color-primary'>27903047281</h2>
          </div>
         
        </div>
        <div className='flex  gap-4 justify-end'>
            <button className='bg-gray-300 rounded-lg drop-shadow-lg p-2'>Ir al inicio</button>
            <button className=' bg-color-primary rounded-lg drop-shadow-lg p-2'>Descargar comprobante</button>
        </div>
    </div>
  )
}

export default page