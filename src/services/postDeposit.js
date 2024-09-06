// En tu archivo de servicio postDeposit
import axios from "axios";

export const postDeposit = async (token, account_id, amount) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    console.error("No hay token");
    return;
  }

  // Crear el objeto con los datos requeridos
  const transferenceRequest = {
    amount, // El monto que viene del formulario
    dated: new Date().toISOString(), // Genera la fecha actual en formato ISO
    destination: "Destination description or data", // Cambia esto con los datos específicos si tienes
    origin: "Origin description or data", // Cambia esto con los datos específicos si tienes
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/accounts/${account_id}/deposits`,
      transferenceRequest,
      {
        headers: {
          Authorization: token, 
          "Content-Type": "application/json",
        },
      }
    );
    console.log('Request Data:', transferenceRequest);
    return response.data;
  } catch (error) {
    console.error("Error al realizar el depósito:", error);
    throw error;
  }
};
