# Crypto Tracker Project

A complete React-based cryptocurrency tracker that displays live market data, economic calendar events, market session timelines, and the latest crypto news. This project uses the MERN stack for backend integration and provides a comprehensive, real-time cryptocurrency tracking experience.

## Features

- **Live Cryptocurrency Data**: Fetch live data for cryptocurrencies such as market cap, price, and price change.
- **TradingView Charts**: Display interactive charts using TradingView for visual representation of crypto price trends.
- **Crypto News**: Display the latest crypto news articles with clickable links for more information.
- **Economic Calendar**: Track economic events and their forecasted impact on the market.
- **Market Session Timelines**: View the opening times for major cryptocurrency markets (Sydney, Tokyo, London, New York) and their current status.
- **Responsive Design**: Optimized for both mobile and desktop views, with different layouts for each screen size.

## Demo

You can check out a demo of the project here: [https://ascryptotracker.netlify.app](#)

## Project Structure

The project consists of both frontend and backend components:

### Frontend

- **React**: Used for building the user interface.
- **Tailwind CSS**: Used for styling and responsiveness.
- **React Router**: For routing between different pages.
- **Firebase**: For user authentication and management.
- **Axios**: For making API requests to fetch cryptocurrency data and news.
  
### Backend

- **Express.js**: The backend API that fetches live cryptocurrency data.
- **MongoDB**: Stores historical data and economic events.
- **Binance API**: Used to fetch live cryptocurrency data.
- **Financial Modeling API**: Used to fetch live economic calendar data.
- **Crypto Compare News API**: Used to fetch live crypto news.
- **Twillo API** : Used for alert feature

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
1. **Navigate into the project directory:**:
   ```bash
   cd crypto-tracker
1. **Install the backend dependencies**:
   ```bash
    cd backend
    npm install

1. **Set up your .env file:**:
   ```bash
   PORT:"your port number"
   TWILIO_ACCOUNT_SID : "your-api-key"
   TWILIO_AUTH_TOKEN :"your-token-key"
   
1. **Start the backend server**:
   ```bash
   node app.js
1. **Install the frontend dependencies**:
   ```bash
   cd ../frontend
    npm install

1. **start frontend**:
   ```bash
    npm run dev
 
## Screenshots
![{SignupPage}](https://github.com/user-attachments/assets/e2ad9225-4b81-49fc-8e7b-391fb1c8eb63)
![{547267E4-3D66-4BA1-AFBF-C261AE3CE16C}](https://github.com/user-attachments/assets/ccce79bf-9a63-4231-bc42-6a41dd220e81)
![{E91DAB77-017C-42CB-9184-B44AE131B9D5}](https://github.com/user-attachments/assets/bad17781-feed-439b-ae60-7a68c7efd075)
![{F8E4D350-A9D7-41CF-96FE-000810D15651}](https://github.com/user-attachments/assets/41654b5c-8ad4-40c3-8c6e-7d0d3136c89c)
![{7A557A56-F534-4425-A0A9-1C3442784E9C}](https://github.com/user-attachments/assets/04095799-8704-4458-9eb3-ec31b5b8f271)




