import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Function to fetch all transactions related to an account
export const getTransactions = async (
  setAccountData,
  setTransactions,
  token
) => {
  if(!token) {
    return 
  } else {
    let account_id = null
  
  try {
    const responseAccountDetail = await axios.get(`${BASE_URL}/account`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!responseAccountDetail.data) {
      throw new Error("Error al obtener los detalles de la cuenta");
    }

    setAccountData(responseAccountDetail.data);
    account_id = responseAccountDetail.data.id;

    console.log(account_id);
  } catch (error) {
    console.error(error);
    return;
  }

  if (!account_id) {
    console.error("account_id no disponible");
    return;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/accounts/${account_id}/transferences`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    setTransactions(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
}

// Function to add a new transaction to an account
export const addTransaction = async (account_id, transactionData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/accounts/${account_id}/transferences`,
      transactionData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding transaction:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to delete a transaction (if needed, depending on API support)
export const deleteTransaction = async (account_id, transactionId, token) => {
  try {
    await axios.delete(
      `${BASE_URL}/accounts/${account_id}/transferences/${transactionId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
