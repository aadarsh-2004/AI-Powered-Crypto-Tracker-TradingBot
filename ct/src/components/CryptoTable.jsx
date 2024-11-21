import React, { useState } from "react";

const mockData = [
  { name: "Bitcoin", symbol: "BTC", price: 57000, marketCap: 1070000000 },
  { name: "Ethereum", symbol: "ETH", price: 3700, marketCap: 430000000 },
  { name: "Cardano", symbol: "ADA", price: 2.15, marketCap: 67000000 },
  { name: "Solana", symbol: "SOL", price: 185, marketCap: 65000000 },
  { name: "Polkadot", symbol: "DOT", price: 25.5, marketCap: 25000000 },
];

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Handle Sorting
  const handleSort = (sortKey) => {
    setSortBy(sortKey);
    const sortedData = [...cryptos].sort((a, b) => {
      if (sortKey === "name" || sortKey === "symbol") {
        return a[sortKey].localeCompare(b[sortKey]);
      }
      return b[sortKey] - a[sortKey]; // Sort numerically (descending)
    });
    setCryptos(sortedData);
  };

  // Handle Filtering
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = mockData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(value) ||
        crypto.symbol.toLowerCase().includes(value)
    );
    setCryptos(filteredData);
  };

  return (
    <div className="bg-cardBg p-6 rounded-lg shadow-md">
      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or symbol"
          className="bg-darkBg text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-orange-400"
        />

        {/* Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="bg-darkBg text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-orange-400"
        >
          <option value="name">Sort by Name</option>
          <option value="symbol">Sort by Symbol</option>
          <option value="price">Sort by Price</option>
          <option value="marketCap">Sort by Market Cap</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <thead className="bg-cardHover text-orange-400">
          <tr>
            <th className=" py-2">Name</th>
            <th className="py-2">Symbol</th>
            <th className="py-2">Price</th>
            <th className="py-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, idx) => (
            <tr key={idx} className="hover:bg-cardHover transition">
              <td className="py-2">{crypto.name}</td>
              <td className="py-2">{crypto.symbol}</td>
              <td className="py-2">${crypto.price.toLocaleString()}</td>
              <td className="py-2">${crypto.marketCap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
