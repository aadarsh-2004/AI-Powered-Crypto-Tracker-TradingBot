import axios from "axios";
export const sendNotification = async (phoneNumber, message) => {
  try {
    const response = await axios.post("http://localhost:5000/api/sms/send-notification", {
      phoneNumber,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error("Error sending notification");
  }
};
