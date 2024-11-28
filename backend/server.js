const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { fetchLiveCryptoData, fetchTopLooserCryptoData } = require("./API/cryptoAPI");
const economicCalendarRoutes = require("./API/economicCalendar");
const bodyParser = require('body-parser');
const smsRoutes = require('./API/smsRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/api/cryptos", async (req, res) => {
  try {
    const { topGainers, topLosers } = await fetchTopLooserCryptoData();
    const allData = await fetchLiveCryptoData(); // Full data
    res.status(200).json({ topGainers, topLosers, allData });
  } catch (error) {
    console.error("Error in /api/cryptos:", error.message);
    res.status(500).json({ error: "Failed to fetch cryptocurrency data" });
  }
});

// Mount the SMS API
app.use('/api/sms', smsRoutes); 

// Use the economic calendar route
app.use("/api/EC", economicCalendarRoutes);

const CRYPTO_NEWS_API_KEY = "52da2c51164fd773c39bab03b43d9df8ac84a01247102a46fde8a04b7b7dfac3";
app.get("/api/crypto-news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${CRYPTO_NEWS_API_KEY}`
    );
    res.json(response.data.Data); // Send only the news data
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
