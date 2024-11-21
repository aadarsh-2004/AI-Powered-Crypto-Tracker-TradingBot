import React, { useEffect, useState } from "react";
import { fetchLiveCryptoData } from "../../API/cryptoAPI"; // Adjust the path based on your frontend's folder structure

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Live Data on Component Mount and set interval for dynamic updates
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchLiveCryptoData(); // Fetch live data from the backend API
        const formattedData = data.map((item) => ({
          name: item.symbol, // Using `symbol` as the name
          symbol: item.symbol,
          price: parseFloat(item.lastPrice),
          marketCap: parseFloat(item.quoteVolume), // Approximated as 24hr volume
        }));
        setCryptos(formattedData);
        setFilteredCryptos(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    getData(); // Fetch data initially

    // Set up polling to fetch data every minute (15,000 ms)
    const intervalId = setInterval(getData, 60000); // Fetch every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle Sorting
  const handleSort = (sortKey) => {
    setSortBy(sortKey);
    const sortedData = [...filteredCryptos].sort((a, b) => {
      if (sortKey === "name" || sortKey === "symbol") {
        return a[sortKey].localeCompare(b[sortKey]);
      }
      return b[sortKey] - a[sortKey]; // Sort numerically (descending)
    });
    setFilteredCryptos(sortedData);
  };

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(value) ||
        crypto.symbol.toLowerCase().includes(value)
    );
    setFilteredCryptos(filteredData);
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
      {loading ? (
        <div className="text-center text-orange-400">Loading data...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        <table className="w-full table-auto">
          <thead className="bg-cardHover text-orange-400">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Symbol</th>
              <th className="py-2">Price</th>
              <th className="py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.slice(0, 10).map((crypto, idx) => (
              <tr key={idx} className="hover:bg-cardHover transition">
                <td className="py-2">{crypto.name}</td>
                <td className="py-2">{crypto.symbol}</td>
                <td className="py-2">${crypto.price}</td>
                <td className="py-2">${crypto.marketCap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTable;
