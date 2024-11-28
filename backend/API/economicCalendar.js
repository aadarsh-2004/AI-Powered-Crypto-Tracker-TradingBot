const express = require("express");
const axios = require("axios");
const router = express.Router();

// API Key for Financial Modeling Prep
const API_KEY = "llr1EJph7OOimCQUn9R4wR5RKpZDiocl";

// Route to fetch economic calendar data
router.get("/economic-calendar", (req, res) => {
    const mockData = [
      {
        date: "2024-11-25",
        country: "United States",
        event: "GDP Growth Rate",
        actual: "2.1%",
        forecast: "2.3%",
        previous: "1.9%",
      },
      {
        date: "2024-11-26",
        country: "Germany",
        event: "Unemployment Rate",
        actual: "3.0%",
        forecast: "3.1%",
        previous: "3.0%",
      },
      {
        date: "2024-11-25",
        country: "United States",
        event: "GDP Growth Rate",
        actual: "2.1%",
        forecast: "2.3%",
        previous: "1.9%",
      },
      {
        date: "2024-11-26",
        country: "Germany",
        event: "Unemployment Rate",
        actual: "3.0%",
        forecast: "3.1%",
        previous: "3.0%",
      },
      {
        date: "2024-11-25",
        country: "United States",
        event: "GDP Growth Rate",
        actual: "2.1%",
        forecast: "2.3%",
        previous: "1.9%",
      },
      {
        date: "2024-11-26",
        country: "Germany",
        event: "Unemployment Rate",
        actual: "3.0%",
        forecast: "3.1%",
        previous: "3.0%",
      },
      {
        date: "2024-11-25",
        country: "United States",
        event: "GDP Growth Rate",
        actual: "2.1%",
        forecast: "2.3%",
        previous: "1.9%",
      },
      {
        date: "2024-11-26",
        country: "Germany",
        event: "Unemployment Rate",
        actual: "3.0%",
        forecast: "3.1%",
        previous: "3.0%",
      },
      
    ];
  
    res.json(mockData);
  });

module.exports = router;
