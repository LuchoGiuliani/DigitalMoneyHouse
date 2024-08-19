import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

export const getCards = async (accountId, token) => {
  
  console.log("token", token);
  
  try {
    const response = await axios.get(`${BASE_URL}/api/accounts/${accountId}/cards`, {
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
    const response = await axios.post(`${BASE_URL}/api/accounts/${account_id}/cards`, cardData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    console.log("responseAddCard", response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error adding card:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCard = async (accountId, cardId, token) => {
 
  try {
    await axios.delete(`${BASE_URL}/api/accounts/${accountId}/cards/${cardId}`, {
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
