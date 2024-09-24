import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getCards = async (accountId, token) => {
  

  
  try {
    const response = await axios.get(`${BASE_URL}/accounts/${accountId}/cards`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
   
  }
};

export const addCard = async (account_id, cardData, token) => {


  try {
    const response = await axios.post(`${BASE_URL}/accounts/${account_id}/cards`, cardData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
    
  } catch (error) {
    console.error("Error adding card:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCard = async (accountId, cardId, token) => {
 
  try {
    await axios.delete(`${BASE_URL}/accounts/${accountId}/cards/${cardId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};
