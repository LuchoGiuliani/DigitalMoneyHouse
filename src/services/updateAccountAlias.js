import axios from "axios";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const updateAccountAlias = async (account, account_id, token) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/accounts/${account_id}`, account, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export default updateAccountAlias;
