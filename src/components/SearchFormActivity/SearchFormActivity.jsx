import { useActivity } from "@/context/activityContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SearchFormActivity = () => {
  const { register, handleSubmit } = useForm();
  const {
    setFilter,
    openFilter,
    setOpenFilter,
    accountActivity,
    setAccountActivity,
    accountData,
    originalAccountActivity,
    setOriginalAccountActivity,
  } = useActivity();
  const pathname = usePathname();

  const isDashboardPage = pathname === "/dashboard";

  const handleClick = () => {
    setOpenFilter(!openFilter);
  };

  const onSubmit = (data) => {
    const searchTerm = data.searchTerm.toLowerCase();

    if (!searchTerm) {
      // Si no hay término de búsqueda, restauramos las actividades originales
      setAccountActivity(originalAccountActivity || accountData);
      setFilter(null);
      return;
    }

    if (!Array.isArray(accountActivity)) {
      console.error("accountActivity is not an array:", accountActivity);
      return;
    }

    // Filtrar actividades basadas en el término de búsqueda
    const filteredActivities = originalAccountActivity.filter((activity) => {
      const description = activity.description.toLowerCase();
      const destination = activity.destination?.toLowerCase() || "";
      const origin = activity.origin?.toLowerCase() || "";
      const amount = activity.amount?.toString() || "";
      const type = activity.type?.toLowerCase() || "";

      const isTransfer =
        description.includes("transferiste") ||
        description.includes("transferi") ||
        destination.includes(searchTerm) ||
        type.includes("Transfer");
      const isDeposit =
        description.includes("ingresaste") ||
        description.includes("deposito") ||
        origin.includes(searchTerm) ||
        type.includes("Deposit");

      return isTransfer || isDeposit || amount.includes(searchTerm);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full p-4 flex gap-2 items-center rounded-lg drop-shadow-lg"
        >
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
            {...register("searchTerm")}
            className="text-gray-400 text-[16px] tablet:text-[20px] outline-none w-full"
          />
          <button type="submit" className="hidden"></button>
        </form>
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
