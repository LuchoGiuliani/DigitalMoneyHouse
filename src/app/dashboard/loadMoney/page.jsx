import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen'>
   
      <div className='bg-color-gray w-full px-12 py-6 flex flex-col gap-4'>
      <div className="flex gap-2 tablet:hidden">
          <Image
           src="/arrowGray.svg"
           width={12}
           height={12}
           className="w-auto h-auto"
           alt="flecha" />
           <h3 className="underline text-color-dark">Cargar dinero</h3>
        </div>
          <Link className='bg-color-darker drop-shadow-lg rounded-lg font-bold gap-2 text-color-primary justify-between flex  p-6  items-center min-h-[200px]' href={"/dashboard/loadMoney/optionA"}>
          <div className='flex gap-2'>
          <Image src={"/userIcon.svg"} width={26} height={26} className='w-auto h-auto' alt='userIcon' />
         <h2>Transferencia bancaria</h2>
          </div>
          <Image src={"/arrow.svg"} width={26} height={26} className='w-auto h-auto' alt='arrow' />

          </Link>
          <Link className='bg-color-darker drop-shadow-lg rounded-lg  font-bold gap-2 text-color-primary flex justify-between items-center p-6  min-h-[200px]' href={"/dashboard/loadMoney/optionB"}>
          <div className='flex gap-2'>
          <Image src={"/cardIcon.svg"} width={26} height={26} className='w-auto h-auto' alt='cardIcon' />
         <h2>Seleccionar tarjeta</h2>
         </div>
         <Image src={"/arrow.svg"} width={26} height={26} className='w-auto h-auto' alt='arrow' />

          </Link>
      </div>
    </div>
  )
}

export default page