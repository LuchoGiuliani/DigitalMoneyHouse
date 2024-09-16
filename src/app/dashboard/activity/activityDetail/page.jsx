"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState,Suspense } from "react";
import Image from 'next/image';
import { useActivity } from "@/context/activityContext";
import dayjs from "dayjs";
import Link from "next/link";

const ActivityDetailContent = () => {
  const searchParams = useSearchParams(); // Para obtener los parámetros de la URL
  const id = searchParams.get("id"); // Obtenemos el 'id' desde los parámetros de búsqueda
  const { accountActivity } = useActivity(); // Acceder a accountActivity desde el hook useActivity

  const [activityDetails, setActivityDetails] = useState(null);

  useEffect(() => {
    // Buscar la actividad con el id correspondiente en accountActivity
    if (id && accountActivity.length > 0) {
      const selectedActivity = accountActivity.find(
        (activity) => activity.id === parseInt(id)
      );
      if (selectedActivity) {
        setActivityDetails(selectedActivity);
      }
    }
  }, [id, accountActivity]);

  // Si no encuentra la actividad, mostramos un mensaje de error
  if (!activityDetails) {
    return <div>Cargando detalles de la actividad...</div>;
  }

  return (
    <div className='bg-color-gray w-full min-h-screen flex flex-col gap-4 p-8 '>
      <div className="flex gap-2 tablet:hidden">
        <Image
          src="/arrowGray.svg"
          width={12}
          height={12}
          className="w-auto h-auto"
          alt="flecha"
        />
        <h3 className="underline text-color-dark">Inicio</h3>
      </div>
      <div className='bg-color-darker py-4 px-8 flex flex-col gap-4 w-full rounded-lg drop-shadow-lg h-fit '>

        <div className='border-b flex flex-col tablet:flex-row justify-between pb-2'>
          <div className="flex max-h-[46px] items-center gap-2 ">
            <Image  src="/checkGreen.svg"
          width={8}
          height={8}  
          className="w-[22px] h-[22px]"
          alt="flecha" />
          <h2 className='text-color-primary font-bold'>
          Aprobada
          </h2>
          </div>
          <h2 className='text-color-gray'>
            Creada el {dayjs(activityDetails.dated).format("DD MMMM YYYY  HH:mm")}hs
          </h2>
        </div>
        <div className='flex flex-col '>
          <h2 className='text-color-gray font-semibold'>{activityDetails.type === "Deposit" ? "Depositaste" : "Transferencia de dinero"}</h2>
          <h2 className='text-color-primary'>${activityDetails.amount.toFixed(2)}</h2>
        </div>
        <div className='flex flex-col '>
          <h2 className='text-color-gray text-[16px] font-thin'>Le transferiste a</h2>
          <h2 className='text-color-primary'>Rodrigo Vaccaro</h2>
        </div>
        <div className='flex flex-col '>
          <h2 className='text-color-gray text-[16px] font-thin'>Número de operación</h2>
          <h2 className='text-color-primary'>27903047281</h2>
        </div>
      </div>
      <div className='flex gap-4 justify-end'>
        <Link href="/dashboard" className='bg-gray-300 rounded-lg drop-shadow-lg p-2'>Ir al inicio</Link>
        <button className='bg-color-primary rounded-lg drop-shadow-lg p-2'>Descargar comprobante</button>
      </div>
    </div>
  );
};

const ActivityDetail = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <ActivityDetailContent />
  </Suspense>
);

export default ActivityDetail;
