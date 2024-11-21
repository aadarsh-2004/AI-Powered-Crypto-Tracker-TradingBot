import React, { useState } from "react";
import CryptoTable from "./CryptoTable";
import TradingViewChart from "./TradingViewChart";
import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTCUSDT"); // Default to Bitcoin
  const [fullView, setFullView] = useState(false); // Track full-screen chart view

  const { user: currentUser } = useAuth();
  const user = {
    email: currentUser?.email || "No user logged in",
    avatar: currentUser?.photoURL,
  };

  const handleCryptoSelection = (cryptoSymbol) => {
    setSelectedCrypto(cryptoSymbol);
    setFullView(false); // Ensure it returns to mini view when a new crypto is selected
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-orange-400">CryptoTracker</h1>

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

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Crypto Table */}
        <div className="col-span-2">
          <CryptoTable onRowClick={handleCryptoSelection} />
        </div>

        {/* Chart Section */}
        <div className="bg-cardBg p-6 rounded-lg shadow-neon">
          <TradingViewChart symbol={selectedCrypto} fullView={fullView} />
          <button
            className="mt-4 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
            onClick={() => setFullView(!fullView)}
          >
            {fullView ? "Close Full View" : "View Full Chart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
