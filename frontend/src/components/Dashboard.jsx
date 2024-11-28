import React, { useState ,useEffect ,useRef } from "react";
import CryptoTable from "./CryptoTable";
import TradingViewChart from "./TradingViewChart";
import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import {  fetchLiveCryptoData } from "../../API/cryptoAPI";
import {sendNotification} from "../../API/LoggedInEmailNotification";  
import NewsPreview from "./NewsPreview";
import axios from "axios";
import EconomicCalendar from "./EconomicCalendar";
import SessionTimeline from "./SessionTimeline";

const Dashboard = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("ETHBTC"); // Default to Bitcoin
  const [fullView, setFullView] = useState(false); // Track full-screen chart view
  const [cryptoData, setCryptoData] = useState({ topGainers: [], topLosers: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { user: currentUser } = useAuth();
  const smsSent =useRef(false);
  const user = {
    email: currentUser?.email || "No user logged in",
    avatar: currentUser?.photoURL,
  };

  useEffect(() => {
    // Send the email to your backend via API call
    const sendEmailToBackend = async () => {
      try {
        await sendNotification("+917877571101", `Welcome to Crypto Tracker! The logged-in email is: ${user.email}`);

      } catch (error) {
        console.error("Error sending SMS:", error);
      }

    };

    // Check if the user is logged in and if SMS has not already been sent
    if (currentUser && !smsSent.current) {
      sendEmailToBackend(); // Call the backend when the user is logged in
      smsSent.current = true; // Mark SMS as sent
    }
  }, [currentUser]);

  // Fetch live crypto data from backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLiveCryptoData();
      setCryptoData(data || { topGainers: [], topLosers: [] }); // Fallback for empty data
    };
    fetchData();
    smsSent.current = true; // Mark SMS as sent
  }, []);
  
  const { topGainers = [], topLosers = [] } = cryptoData; // Avoid undefined errors
  // handle news click
  const handleNewsClick = (article) => {
    setSelectedArticle(article); // Set the selected article to expand
  };
 

  // Handle the selection of a crypto symbol
  const handleCryptoSelect = (symbol) => {
    setSelectedCrypto(symbol);
    setFullView(true);
    // Ensure it returns to mini view when a new crypto is selected
  };

  return (
    <div className="bg-gradient-to-tr from-blue-950 via-gray-950 to-black text-white min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-medium text-white-400">
          Crypto Tracker
        </h1>

        {/* Profile Section */}
        <div className="relative">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center gap-2 bg-cardBg px-4 py-2 rounded-lg shadow hover:bg-cardHover focus:outline-none focus:ring focus:ring-neonGreen">
                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-orange-400"
                />
                {/* Email */}
                <span className="hidden md:inline-block">{user.email}</span>
                {/* Chevron Icon */}
                <FiChevronDown className="text-orange-400" />
              </Menu.Button>
            </div>

            {/* Dropdown Menu */}
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg  border border-gray-800 z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to=".././Profile"
                    className={`block px-4 py-2 ${
                      active ? "bg-cardHover text-orange-400" : "text-white"
                    }`}
                  >
                    View Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#settings"
                    className={`block px-4 py-2 ${
                      active ? "bg-cardHover text-orange-400" : "text-white"
                    }`}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>

      {/* Top Gainers/Losers Section */}
      <div className="mb-8 bg-transparent   ">
        <div className="flex gap-8 ">
          <div className="w-1/2 bg-darkBg p-4 rounded-lg ">
            <h3 className="text-xl font-medium mb-4 text-green-500">Top Gainers</h3>
            <div className="grid grid-cols-3 gap-4 scrollbar-hide overflow-auto">
              {topGainers.map((coin, index) => (
                <div
                  key={index}
                  className="p-2 bg-gradient-to-br from-green-900 to-black rounded-lg shadow hover:scale-105 transition-transform duration-300"
                >
                  <h4 className="text-lg font-bold text-green-200">
                    {coin.name} 
                  </h4>
                  <p className="text-sm text-white mt-1">{coin.price}</p>
                  <p className="text-sm font-semibold text-green-500 mt-2">{coin.change}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 bg-darkBg p-4 rounded-lg " >
            <h3 className="text-xl font-medium mb-4 text-red-500">Top Losers</h3>
            <div className="grid grid-cols-3 gap-4 scrollbar-hide overflow-auto">
              {topLosers.map((coin, index) => (
                <div
                  key={index}
                  className="p-2 bg-gradient-to-br from-red-900 to-black rounded-lg shadow hover:scale-105 transition-transform duration-300"
                >
                  <h4 className="text-lg font-bold text-red-300">
                    {coin.name} 
                  </h4>
                  <p className="text-sm text-white mt-1">{coin.price}</p>
                  <p className="text-sm font-semibold text-red-500 mt-2">{coin.change}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Dashboard */}
      <div className="flex justify-around gap-8  ">
        {/* Crypto Table */}
        <div className="w-[830px] scrollbar-hide overflow-auto ">
          <CryptoTable onCryptoSelect={handleCryptoSelect} />
        </div>

        {/* Chart Section */}
        <div
          className={`flex flex-col p-1 items-end rounded-xl drop-shadow-[0px_0px_20px_rgba(59,130,246,0.6)] bg-transparent ${
            fullView ? "w-full h-fit" : "w-[600px]"
          } transition-all duration-300`}
        >
          <TradingViewChart symbol={selectedCrypto} fullView={fullView} />
          <button
            className="mt-1 py-1 text-xl font-semibold w-[50px] bg-cardBg text-white rounded-xl"
            onClick={() => setFullView(!fullView)}
          >
            {fullView ? "] [" : "[ ]"}
          </button>
        </div>
        
      </div>
          {/* News Section */}
      <div className="flex mt-8 w">
        {/* News Section */}
        <div className={`w-screen ${selectedArticle ? "hidden" : ""}`}>
          <NewsPreview onNewsClick={handleNewsClick} />
        </div>

        {/* Expanded News View */}
        {selectedArticle && (
          <div className="w-full bg-cardBg p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedArticle(null)} // Close the expanded view
              className="text-red-500 text-sm mb-4"
            >
              Back to News
            </button>
            <h3 className="text-3xl font-bold text-wrap mb-4">
              {selectedArticle.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {new Date(selectedArticle.published_on * 1000).toLocaleString()}
            </p>
            <img
              src={selectedArticle.imageurl}
              alt="News"
              className="w-60 h-60 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-200">{selectedArticle.body}</p>
            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neonGreen mt-4 block hover:underline"
            >
              Read Full Article
            </a>
          </div>
        )}
      </div>
      {/* Economic  Lacendar */}
      <div className="mt-8">
        <EconomicCalendar />
      </div>
      {/* Session Component */}
      <div>
        <SessionTimeline/>
      </div>
    </div>
  );
};

export default Dashboard;
