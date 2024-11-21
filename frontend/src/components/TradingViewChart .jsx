import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol, fullView }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    if (chartRef.current) chartRef.current.innerHTML = "";

    new window.TradingView.widget({
      container_id: "tradingview-widget-container",
      autosize: true,
      symbol: `BINANCE:${symbol.toUpperCase()}`,
      interval: fullView ? "D" : "15", // "D" for daily full chart, "15" for mini chart
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: !fullView,
      details: true,
      allow_symbol_change: fullView,
    });
  }, [symbol, fullView]);

  return <div id="tradingview-widget-container" ref={chartRef} style={{ height: "400px" }} />;
};

export default TradingViewChart;
