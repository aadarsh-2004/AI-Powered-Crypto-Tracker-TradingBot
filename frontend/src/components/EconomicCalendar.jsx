import React, { useState, useEffect } from "react";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const EconomicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEconomicCalendar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/EC/economic-calendar`);
        const data = await response.json();
        setEvents(data); // Set the fetched events
      } catch (err) {
        console.error("Error fetching economic calendar:", err);
        setError("Failed to load economic calendar data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicCalendar();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-cardBg p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Economic Calendar</h2>
      <div className="overflow-auto h-96">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr>
              <th className="border-b border-gray-700 p-2">Date</th>
              <th className="border-b border-gray-700 p-2">Country</th>
              <th className="border-b border-gray-700 p-2">Event</th>
              <th className="border-b border-gray-700 p-2">Actual</th>
              <th className="border-b border-gray-700 p-2">Forecast</th>
              <th className="border-b border-gray-700 p-2">Previous</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="border-b border-gray-700 p-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="border-b border-gray-700 p-2">{event.country}</td>
                <td className="border-b border-gray-700 p-2">{event.event}</td>
                <td className="border-b border-gray-700 p-2">{event.actual || "N/A"}</td>
                <td className="border-b border-gray-700 p-2">{event.forecast || "N/A"}</td>
                <td className="border-b border-gray-700 p-2">{event.previous || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EconomicCalendar;
