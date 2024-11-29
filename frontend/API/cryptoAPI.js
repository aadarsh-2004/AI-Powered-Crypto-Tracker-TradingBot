
//frontend 
// Use fetch  data from your backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = "https://ai-powered-crypto-tracker.onrender.com"
// const API_BASE_URL = "http://localhost:5000"; // Hardcoded for testing

const fetchLiveCryptoData = async () => {
  try {
    console.log("API Base URL:",process.env.REACT_APP_API_BASE_URL);

     
    const response = await fetch(`${API_BASE_URL}/api/cryptos`);
    const data = await response.json(); 
    return data;
    
    
  } catch (error) {
    console.error("Error fetching data from backend:", error.message);
    return { topGainers: [], topLosers: []};
  }
};


export { fetchLiveCryptoData  };
