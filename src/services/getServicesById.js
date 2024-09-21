import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_SERVICE;

const getServicesById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);

    if (!response.data) {
      throw new Error("Error al obtener los detalles de la cuenta");
    }

    return response.data; // Devuelve los datos
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

export default getServicesById;
