import axios from "axios";

export const getUserById = async (user_id, token) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL


  if (!token) {
    console.error("No hay token");
    return;
  }
  try {
    const response = await axios.get(`${BASE_URL}/users/${user_id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    
    response.data
   
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
