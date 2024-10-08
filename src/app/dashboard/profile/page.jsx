"use client"
import { handleCopy } from "@/utils/clipboard";
import { useSaveUser } from "@/hooks/useSaveUser";
import { useAuth } from "@/hooks/useAuth";
import AccountData from "@/components/AccountData/AccountData";
import { useUser } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import getAccountDetail from "@/services/getUserAccount";
import { getUserById } from "@/services/getUserById";

const Page = () => {
  const { userData, setUserData, accountData, setAccountData } = useUser();
  const { token, setToken } = useAuth();
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    fullname: "",
    cuit: "",
    phone: "",
    password: "******",
  });

  const [editState, setEditState] = useState({
    email: false,
    fullname: false,
    cuit: false,
    phone: false,
    password: false,
  });

  const { handleSave } = useSaveUser(setUserData, userData);

  useEffect(() => {
    const fetchAccountData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      if (tokenFromStorage) {
        try {
          await getAccountDetail(setAccountData, tokenFromStorage);
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
    };

    fetchAccountData();
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
      const userId = JSON.parse(window.localStorage.getItem("user_id"));
      if (tokenFromStorage && userId) {
        try {
          const data = await getUserById(userId, tokenFromStorage);
          setUserData(data);
          router.refresh();
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (userData && accountData) {
      setFormState({
        email: userData.email,
        fullname: `${userData.firstname} ${userData.lastname}`,
        cuit: userData.dni,
        phone: userData.phone,
        Contraseña: "******",
      });
    }
  }, [userData, accountData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditState((prevState) => ({ ...prevState, [field]: true }));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-[#EEEAEA]">
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "bg-color-primary rounded-lg p-4 flex items-center gap-2",
            title: "text-black",
          },
        }}
        position="bottom-right"
      />
      <section className="flex">
        <div className="min-h-screen px-6 py-6 tablet:px-[79px] tablet:py-[40px] flex flex-col gap-4 w-full">
          <div className="flex gap-2 tablet:hidden">
            <Image src="/arrowGray.svg" width={12} height={12} className="w-auto h-auto" alt="flecha" />
            <h3 className="underline text-color-dark">Perfil</h3>
          </div>
          <article className="bg-white flex flex-col rounded-md p-4 drop-shadow-md">
            <div>
              <h1 className="font-bold text-[24px] pb-4">Tus datos</h1>
            </div>
            <div className="flex justify-between gap-2 w-full border-b">
              <div className="flex tablet:flex-row flex-col tablet:gap-6 w-full tablet:items-center">
                <h2 className="font-semibold min-w-[220px] capitalize py-1">Email</h2>
                <input
                  type="email"
                  name="email"
                  value={formState.email || ""}
                  disabled
                  className="bg-white text-gray-300 py-1 w-full"
                />
              </div>
            </div>
            {["fullname", "cuit", "phone", "Contraseña"].map((field, index) => (
              <div key={index} className="flex justify-between gap-2 w-full border-b py-1">
                <div className="flex flex-col tablet:flex-row tablet:gap-6 w-full tablet:items-center">
                  <h2 className="font-semibold min-w-[220px] capitalize">
                    {field === "fullname" ? "Nombre y apellido" : field === "phone" ? "Télefono" : field}
                  </h2>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={formState[field] || ""}
                    onChange={handleInputChange}
                    placeholder={field === "fullname" ? "Nombre y apellido" : ""}
                    disabled={!editState[field]}
                    className={editState[field] ? "" : "bg-white text-gray-300"}
                  />
                </div>
                <button
                  onClick={() => (editState[field] ? handleSave(field, formState, setEditState, setToken) : handleEdit(field))}
                  className={`${editState[field] ? "bg-color-primary" : "bg-white"} text-white p-2 rounded hover:scale-90`}
                >
                  <Image width={22} height={22} alt="iconoEdit" src="/iconoEdit.svg" />
                </button>
              </div>
            ))}
          </article>
          <article className="bg-color-primary p-4 flex w-full rounded-md drop-shadow-md">
            <Link className="text-[22px] font-semibold flex justify-between w-full hover:text-color-dark" href="/dashboard/loadMoney">
              Gestioná los medios de pago
              <Image width={42} height={8} alt="iconoflecha" className="w-auto h-auto" src="/arrowBlack.svg" />
            </Link>
          </article>
          <AccountData accountData={accountData} handleCopy={(text) => handleCopy(text, toast)} />
        </div>
      </section>
    </main>
  );
};

export default Page;
