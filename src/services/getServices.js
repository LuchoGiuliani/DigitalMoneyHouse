import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICE;

const getServices = async (setServices) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setServices(response.data);
    if (!response.data) {
      throw new Error("Error al obtener los detalles de la cuenta");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getServices;
