// backend/index.js
const express = require('express');
const Binance = require('binance-api-node').default;
const cors = require('cors');

const app = express();
app.use(cors());

const client = Binance();

app.get('/prices', async (req, res) => {
    const prices = await client.prices();
    res.json(prices);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
