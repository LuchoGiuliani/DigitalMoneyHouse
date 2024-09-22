// hooks/useSaveUser.js
import { getUserById } from "@/services/getUserById";
import updateUser from "@/services/updateUser";
import { toast } from "sonner";

export const useSaveUser = (setUserData, userData) => {
  const handleSave = async (field, formState, setEditState, setToken) => {
    const tokenFromStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenFromStorage);

    try {
      const [firstname, ...lastnameParts] = formState.fullname.split(" ");
      const lastname = lastnameParts.join(" ");
      const updatedData =
        field === "fullname" ? { firstname, lastname } : { [field]: formState[field] };

      await updateUser(updatedData, userData.id, tokenFromStorage);

      setEditState((prevState) => ({ ...prevState, [field]: false }));
      const updatedUserData = await getUserById(userData.id, tokenFromStorage);
      setUserData(updatedUserData);

      toast.success("Datos editados correctamente");
    } catch (error) {
      console.error("Failed to update user data:", error);
      toast.error("Error updating data");
    }
  };

  return { handleSave };
};
