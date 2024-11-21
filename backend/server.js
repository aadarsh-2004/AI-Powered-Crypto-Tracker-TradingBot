const express = require("express");
const { fetchLiveCryptoData } = require("./API/cryptoAPI");
const cors = require("cors");


const app = express();
const PORT = 5000;


// Middleware
app.use(cors()); // Allows cross-origin requests from the frontend
app.use(express.json());

// API Endpoint for fetching live crypto data
app.get("/api/cryptos", async (req, res) => {
    try {
        const cryptoData = await fetchLiveCryptoData();
        res.status(200).json(cryptoData);
    } catch (error) {
        console.error("Error in /api/cryptos:", error.message);
        res.status(500).json({ error: "Failed to fetch cryptocurrency data" });
    }
});



// Server Listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
