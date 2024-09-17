// En tu archivo de servicio postDeposit
import axios from "axios";

export const postDeposit = async (token, account_id, amount) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    console.error("No hay token");
    return;
  }

  
  const transferenceRequest = {
    amount,
    dated: new Date().toISOString(), 
    destination: "Destination description or data",
    origin: "Origin description or data",
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
