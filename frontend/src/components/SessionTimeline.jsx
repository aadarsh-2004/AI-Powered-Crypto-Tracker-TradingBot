import React, { useEffect, useState } from "react";

// Helper function to get the current time in a specific timezone
const getCurrentTimeInTimezone = (timezone) => {
  const now = new Date();
  return now.toLocaleString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to calculate the percentage position of time on the scale
const calculateTimePosition = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes; // Convert time to minutes
  const percentage = (totalMinutes / (24 * 60)) * 100; // Calculate percentage of the day
  return percentage;
};

// Helper function to calculate time difference in hours and minutes
const calculateTimeDifference = (targetTime, currentTime) => {
  const [targetHours, targetMinutes] = targetTime.split(":").map(Number);
  const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

  let hoursLeft = targetHours - currentHours;
  let minutesLeft = targetMinutes - currentMinutes;

  if (minutesLeft < 0) {
    minutesLeft += 60;
    hoursLeft -= 1;
  }

  if (hoursLeft < 0) {
    hoursLeft += 24; // Adjust for the next day
  }

  return { hoursLeft, minutesLeft };
};

// Define market sessions
const sessions = [
  {
    city: "Sydney",
    timezone: "Australia/Sydney",
    openingTime: "03:30", // 3:30 AM india time
  },
  {
    city: "Tokyo",
    timezone: "Asia/Tokyo",
    openingTime: "05:30", // 7:00 AM india time
  },
  {
    city: "London",
    timezone: "Europe/London",
    openingTime: "13:30", // 8:00 AM india time
  },
  {
    city: "New York",
    timezone: "America/New_York",
    openingTime: "18:30", // 9:30 AM india time
  },
];

const SessionTimeline = () => {
  const [localTimes, setLocalTimes] = useState({});
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  // Update local times and calculate current time position on the scale
  useEffect(() => {
    const updateTimes = () => {
      const times = {};
      const timeRemaining = {};
      const now = new Date();

      sessions.forEach((session) => {
        // Get the local time for each session
        times[session.city] = getCurrentTimeInTimezone(session.timezone);

        // Calculate time left for each session to open
        const sessionTime = session.openingTime;
        const currentTime = now.toLocaleTimeString("en-US", {
          timeZone: session.timezone,
          hour: "2-digit",
          minute: "2-digit",
        });
        timeRemaining[session.city] = calculateTimeDifference(
          sessionTime,
          currentTime
        );
      });

      // Calculate the current time's position on the scale (percentage)
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTotalMinutes = currentHours * 60 + currentMinutes;
      const currentPercentage = (currentTotalMinutes / (24 * 60)) * 100;

      setLocalTimes(times);
      setCurrentTimePosition(currentPercentage);
      setTimeLeft(timeRemaining);
    };

    // Update the time every minute
    updateTimes();
    const interval = setInterval(updateTimes, 60000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="p-4 bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Market Session Timelines</h2>
      <div className="relative">
        {/* Timeline scale */}
        <div className="flex justify-between text-gray-400 text-xs mb-2">
          <span>2 AM</span>
          <span>3 AM</span>
          <span>4 AM</span>
          <span>5 AM</span>
          <span>6 AM</span>
          <span>7 AM</span>
          <span>8 AM</span>
          <span>9 AM</span>
          <span>10 AM</span>
          <span>11 AM</span>
          <span>12 PM</span>
          <span>1 PM</span>
          <span>2 PM</span>
          <span>3 PM</span>
          <span>4 PM</span>
          <span>5 PM</span>
          <span>6 PM</span>
          <span>7 PM</span>
          <span>8 PM</span>
          <span>9 PM</span>
          <span>10 PM</span>
        </div>

        {/* Timeline */}
        <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
          {/* Vertical line indicating the current time */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-green-500"
            style={{ left: `${currentTimePosition}%` }}
          ></div>

          {/* Session bars */}
          {sessions.map((session, index) => {
            const position = calculateTimePosition(session.openingTime);
            console.log(position);
            
            const remaining = timeLeft[session.city] || { hoursLeft: 0, minutesLeft: 0 };

            return (
              <div
                key={session.city}
                className="absolute flex items-center "
                style={{
                  top: `${index * 30}px`, // Space each session vertically
                  left: `${position}%`, // Align session bar with opening time
                }}
              >
                <div
                  className="h-6 rounded-lg px-2 text-xs font-medium flex flex-col items-start"
                  style={{
                    background: `linear-gradient(to right, ${
                      ["#FF5733", "#FFC300", "#28B463", "#3498DB"][index % 4]
                    }, #2C3E50)`,
                  }}
                >
                  <span>
                    {session.city} - {localTimes[session.city] || "Loading..."}
                  </span>
                  <span className="text-xs text-gray-300">
                    {remaining.hoursLeft}h {remaining.minutesLeft}m left
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionTimeline;
