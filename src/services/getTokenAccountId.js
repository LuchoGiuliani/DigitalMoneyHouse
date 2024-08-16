import { useRouter } from "next/navigation";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error during login");
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchUserAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/account`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching user account");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
