import axios from "axios";
import { useEffect, useState } from "react";


const BASE_URL = "https://digitalmoney.digitalhouse.com";

const getAccountId = async (token) => {
    if (!token) {
      return null;
    }
  
    try {
      const responseAccountDetail = await axios.get(`${BASE_URL}/api/account`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
  
      if (!responseAccountDetail.data) {
        throw new Error("Error al obtener los detalles de la cuenta");
      }
  
      const account_id = responseAccountDetail.data.id;
  
      console.log("account_id:", account_id);
  
      return account_id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export default getAccountId

  
