import React from "react";

// Define market sessions with static data
const sessions = [
  {
    city: "Sydney",
    timezone: "Australia/Sydney",
    openingTime: "03:30",
    timeLeft: { hoursLeft: 2, minutesLeft: 30 }, // Example time left
  },
  {
    city: "Tokyo",
    timezone: "Asia/Tokyo",
    openingTime: "05:30",
    timeLeft: { hoursLeft: 4, minutesLeft: 30 }, // Example time left
  },
  {
    city: "London",
    timezone: "Europe/London",
    openingTime: "13:30",
    timeLeft: { hoursLeft: 8, minutesLeft: 30 }, // Example time left
  },
  {
    city: "New York",
    timezone: "America/New_York",
    openingTime: "18:30",
    timeLeft: { hoursLeft: 13, minutesLeft: 30 }, // Example time left
  },
];

const SessionTimeline = () => {
  return (
    <div className="p-4 bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Market Session Timelines</h2>

      {/* Timeline Container */}
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={session.city}
            className="flex justify-between items-center bg-gray-800 rounded-lg p-4 mb-4"
          >
            {/* Session Info */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-green-400">{session.city}</h3>
              <p className="text-sm text-gray-300">
                Opening Time: {session.openingTime}
              </p>
            </div>

            {/* Time Left */}
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-300">
                {session.timeLeft.hoursLeft}h {session.timeLeft.minutesLeft}m left
              </p>
              <div
                className="h-1 rounded-full mt-2"
                style={{
                  width: `${(session.timeLeft.hoursLeft * 60 + session.timeLeft.minutesLeft) / (24 * 60) * 100}%`,
                  backgroundColor: `linear-gradient(to right, #FF5733, #2C3E50)`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionTimeline;
