import { useActivity } from "@/context/activityContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react"; // Importa useState para manejar el estado del input

const SearchFormActivity = () => {
  const { 
    setFilter, 
    openFilter, 
    setOpenFilter, 
    accountActivity, 
    setAccountActivity, 
    accountData, 
    originalAccountActivity, 
    setOriginalAccountActivity 
  } = useActivity();
  
  const [searchTerm, setSearchTerm] = useState(""); // Almacena el término de búsqueda
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  const handleClick = () => {
    setOpenFilter(!openFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());

    if (!e.target.value) {
      // Si el input está vacío, resetea las actividades al estado original
      setAccountActivity(originalAccountActivity || accountData);
      setFilter(null);
      return;
    }

    const filteredActivities = originalAccountActivity.filter((activity) => {
      const description = activity.description?.toLowerCase() || "";
      const destination = activity.destination?.toLowerCase() || "";
      const origin = activity.origin?.toLowerCase() || "";
      const amount = activity.amount?.toString() || "";
      const type = activity.type?.toLowerCase() || "";

      // Lógica de filtrado por descripción, destino, origen, tipo o monto
      return (
        description.includes(searchTerm) ||
        destination.includes(searchTerm) ||
        origin.includes(searchTerm) ||
        amount.includes(searchTerm) ||
        type.includes(searchTerm)
      );
    });

    setAccountActivity(filteredActivities);
    setFilter(searchTerm);
  };

  useEffect(() => {
    if (!originalAccountActivity && accountActivity.length) {
      setOriginalAccountActivity(accountActivity);
    }
  }, [accountActivity, originalAccountActivity, setOriginalAccountActivity]);

  return (
    <div>
      <div className="flex w-full gap-4">
        <div className="bg-white w-full p-4 flex gap-2 items-center rounded-lg drop-shadow-lg">
          <Image
            src={"/search.svg"}
            width={6}
            height={0}
            className="w-auto h-auto"
            alt="search"
          />
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            value={searchTerm}
            onChange={handleSearchChange} // Actualiza el estado mientras escribe el usuario
            className="text-gray-400 text-[16px] tablet:text-[20px] outline-none w-full"
          />
        </div>
        <button
          className={`${isDashboardPage ? "hidden " : ""}bg-color-primary p-2 px-4 rounded-lg drop-shadow-lg flex gap-2 items-center font-semibold`}
          onClick={handleClick}
        >
          Filtrar
          <Image
            src={"/filter.png"}
            width={2}
            height={0}
            className="h-auto w-auto"
            alt="filter"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchFormActivity;
