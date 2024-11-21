import React, { useEffect, useRef } from "react";

function TradingViewWidget({ symbol }) {
  const container = useRef();

  useEffect(() => {
    // Ensure container is cleared when the component re-renders
    if (container.current) {
      container.current.innerHTML = ''; // Clear previous chart if it exists
    }

    if (symbol) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;

      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "timezone": "Asia/Kolkata",
          "theme": "dark",
          "style": "3",
          "locale": "en",
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "full",
          "popup_height": "full",
          "support_host": "https://www.tradingview.com"
        }`;

      if (container.current) {
        container.current.appendChild(script); // Append the script to the container
      }
    }

    return () => {
      // Clean up when the component is unmounted or updated
      if (container.current) {
        container.current.innerHTML = ''; // Remove the script and clear the container
      }
    };
  }, [symbol]); // Re-run when `symbol` changes

  return (
    <div
      className="bg-cardBg p-2 w-[600px] rounded-lg "
      ref={container} // Attach the ref here
      style={{ height: "500px", width: "100%" }} // Set a fixed height for the chart
    >
      {/* Chart will be embedded here */}
    </div>
  );
}

export default TradingViewWidget;
