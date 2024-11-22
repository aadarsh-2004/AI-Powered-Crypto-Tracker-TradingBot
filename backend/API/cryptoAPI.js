const axios = require("axios");

const fetchTopLooserCryptoData = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
    
    const allData = response.data;

    // Filter top gainers and losers
    const sortedData = allData.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));
    const filteredData = allData.slice(0, 500); // Only return the top 500 items
    // Get top 5 gainers
    const topGainers = sortedData.slice(0, 3).map((coin) => ({
      name: coin.symbol,
      price: `$${parseFloat(coin.lastPrice).toFixed(5)}`,
      change: `+${parseFloat(coin.priceChangePercent).toFixed(3)}%`,
    }));

    // Get top 5 losers
    const topLosers = sortedData.slice(-3).map((coin) => ({
      name: coin.symbol,
      price: `$${parseFloat(coin.lastPrice).toFixed(5)}`,
      change: `${parseFloat(coin.priceChangePercent).toFixed(2)}%`,
    }));

    return {allData: filteredData, topGainers, topLosers };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const fetchLiveCryptoData = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
    return response.data; // Return all cryptocurrency data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

module.exports = { fetchLiveCryptoData,fetchTopLooserCryptoData };
