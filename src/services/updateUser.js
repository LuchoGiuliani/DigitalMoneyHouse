import axios from "axios";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const updateUser = async (user, userId, token2) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/users/${userId}`, user, {
            headers: {
                Authorization: token2,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export default updateUser;
