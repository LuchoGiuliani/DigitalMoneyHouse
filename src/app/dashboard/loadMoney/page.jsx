import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <LeftSidebar />
      <div className='bg-color-gray w-full p-6'>
          <Link className='bg-color-darker drop-shadow-lg rounded-lg font-bold gap-2 text-color-primary justify-between flex p-6 m-6 items-center min-h-[200px]' href={"/dashboard/loadMoney/optionA"}>
          <div className='flex gap-2'>
          <Image src={"/userIcon.png"} width={26} height={26} className='w-auto h-auto' alt='userIcon' />
         <h2>Transferencia bancaria</h2>
          </div>
          <Image src={"/arrow.png"} width={26} height={26} className='w-auto h-auto' alt='arrow' />

          </Link>
          <Link className='bg-color-darker drop-shadow-lg rounded-lg  font-bold gap-2 text-color-primary flex justify-between items-center p-6 m-6 min-h-[200px]' href={"/dashboard/loadMoney/optionB"}>
          <div className='flex gap-2'>
          <Image src={"/cardIcon.png"} width={26} height={26} className='w-auto h-auto' alt='cardIcon' />
         <h2>Seleccionar tarjeta</h2>
         </div>
         <Image src={"/arrow.png"} width={26} height={26} className='w-auto h-auto' alt='arrow' />

          </Link>
      </div>
    </div>
  )
}

export default page