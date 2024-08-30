import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL


const getAccountDetail = async (setAccountData, token) => {

   if(!token) {
    console.log("no hay token");
    return;
   }
    try {
        const response = await axios.get(`${BASE_URL}/account`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data) {
            setAccountData(response.data);
           
            
        }
        if (!response.data) {
            throw new Error("Error al obtener los detalles de la cuenta");
        }
      
        
       
    } catch (error) {
        console.error("Error:", error);
    }
}

export default getAccountDetail