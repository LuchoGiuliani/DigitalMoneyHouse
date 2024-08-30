import axios from "axios";

export const createUser = async (userDataToSend) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  

  try {
    const response = await axios.post(`${BASE_URL}/users`, userDataToSend, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error al crear la cuenta");
    }
    throw error;
  }
};
