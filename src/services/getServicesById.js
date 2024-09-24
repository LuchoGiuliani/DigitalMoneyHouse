import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICE;

const getServicesById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
   

    if (!response.data) {
      throw new Error("Error al obtener los detalles de la cuenta");
    }

    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export default getServicesById;
