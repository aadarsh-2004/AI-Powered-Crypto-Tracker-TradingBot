import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter  } from "react-router-dom";
import { AuthProvider } from".././AuthContext";
import App from "./App";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </AuthProvider>
);
