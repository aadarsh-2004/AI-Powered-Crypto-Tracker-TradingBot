import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const sendNotification = async (phoneNumber, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sms/send-notification`, {
      phoneNumber,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error("Error sending notification");
  }
};
