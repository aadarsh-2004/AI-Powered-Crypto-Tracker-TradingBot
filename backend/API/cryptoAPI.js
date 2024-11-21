const axios = require("axios");

const fetchLiveCryptoData = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

module.exports = { fetchLiveCryptoData };
