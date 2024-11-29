const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
import axios from "axios";
 const fetchCryptoNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/crypto-news`); // Assuming the backend is hosted at the same domain
    return response.data; // Returns the news array
  } catch (error) {
    console.error("Error fetching news from server:", error);
    return [];
  }
};
export { fetchCryptoNews  };
