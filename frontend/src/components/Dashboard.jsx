import React, { useState } from "react";
import CryptoTable from "./CryptoTable";
import TradingViewChart from "./TradingViewChart";
import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("ETHBTC"); // Default to Bitcoin
  const [fullView, setFullView] = useState(false); // Track full-screen chart view

  const { user: currentUser } = useAuth();
  const user = {
    email: currentUser?.email || "No user logged in",
    avatar: currentUser?.photoURL,
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
        <h1 className="text-4xl font-medium  text-white-400">Crypto Tracker</h1>

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
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg overflow-hidden border border-gray-800">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to=".././Profile"
                    className={`block px-4 py-2 ${active ? "bg-cardHover text-orange-400" : "text-white"}`}
                  >
                    View Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#settings"
                    className={`block px-4 py-2 ${active ? "bg-cardHover text-orange-400" : "text-white"}`}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="flex justify-between gap-8">
        {/* Crypto Table */}
        <div className="w-[830px] ">
          <CryptoTable onCryptoSelect={handleCryptoSelect} />
          

        </div>

        {/* Chart Section */}
        <div className={`flex flex-col p-1 items-end rounded-lg shadow-neon bg-cardBg ${fullView ? 'w-full h-fit' : 'w-[600px]'} transition-all duration-300`}>
          <TradingViewChart symbol={selectedCrypto} fullView={fullView} />
          <button
            className="mt-1  py-1 text-xl font-semibold  w-[50px] bg-cardBg text-white rounded-lg "
            onClick={() => setFullView(!fullView)}
          >
            {fullView ? "] [" : "[ ]"}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
