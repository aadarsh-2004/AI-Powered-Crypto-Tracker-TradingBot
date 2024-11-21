import React from "react";
import CryptoTable from "./CryptoTable";
import { SparklineChart } from "./SparklineChart";
import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
const { user: currentUser } = useAuth();
  const user = {
    email: currentUser?.email || "No user logged in",
    avatar: currentUser?.photoURL
    
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
                {/* email */}
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
          <CryptoTable />
        </div>
        {/* Chart */}
        <div className="bg-cardBg p-6 rounded-lg shadow-neon">
          <SparklineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
