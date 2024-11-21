

// Use fetch  data from your backend
const fetchLiveCryptoData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/cryptos"); 
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching data from backend:", error.message);
    return [];
  }
};


export { fetchLiveCryptoData };
