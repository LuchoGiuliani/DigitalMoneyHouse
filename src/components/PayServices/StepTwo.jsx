import React from 'react'

const StepTwo = () => {
  return (
    <main className='bg-color-gray flex flex-col gap-2'>
        <article className='bg-color-darker rounded-lg drop-shadow-lg flex flex-col gap-2'>
            <div className='border-b flex justify-between '>
                <h1 className='bg-color-primary font-bold text-[24px]'>Cablevisión</h1>
                <button className='underline text-white'>Ver detalles del pago</button>
            </div>
            <div>
                <h1 className='text-white font-bold text-[32px]'>Total a pagar</h1>
                <h1 className='text-white font-bold text-[32px]'>$1.153,75</h1>
            </div>
        </article>
        <article>
            TUS TARJETAS MODULO
        </article>
        <button className='bg-color-primary rounded-lg text-color-darker'>Pagar</button>
    </main>
  )
}

export default StepTwo