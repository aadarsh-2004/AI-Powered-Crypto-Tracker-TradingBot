const express = require("express");
const cors = require("cors");
const { fetchLiveCryptoData, fetchTopLooserCryptoData } = require("./API/cryptoAPI");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
