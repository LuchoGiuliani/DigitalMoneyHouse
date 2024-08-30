import axios from "axios";
import { useEffect, useState } from "react";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL


const getAccountActivity = async (setAccountData,setAccountActivity, token) => {
    
    if (!token) {   
        return;
      }
      else{
        let account_id = null;
    
        try {
          const responseAccountDetail = await axios.get(`${BASE_URL}/account`, {
            headers: {
              "Authorization": token,
              'Content-Type': 'application/json',
            },
          });
      
          if (!responseAccountDetail.data) {
            throw new Error("Error al obtener los detalles de la cuenta");
          }
      
          setAccountData(responseAccountDetail.data);
          account_id = responseAccountDetail.data.id;

         
      
        } catch (error) {
           console.error(error)
          return; 
        }
      
        if (!account_id) {
          console.error("account_id no disponible");
          return;
        }
      
        try {
          const response = await axios.get(`${BASE_URL}/accounts/${account_id}/activity`, {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.data) {
            throw new Error("Error al obtener los detalles de la cuenta");
          }
      
          setAccountActivity(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
        return account_id
      }
    
      
    };



export default getAccountActivity