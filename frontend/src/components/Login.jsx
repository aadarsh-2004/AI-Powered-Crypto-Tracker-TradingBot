// src/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle email login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-gradient-to-tr from-blue-900 via-gray-900 to-black text-white">
        {/* Left Side Form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-darkBg shadow-2xl rounded-lg p-8 border border-gray-800">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-6">
              <label className="block text-gray-400 font-medium mb-2 text-xl">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 bg-cardBg text-white border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-neonGreen"
                placeholder="you@example.com"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 font-medium mb-2 text-xl">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-cardBg text-white border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-neonGreen"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-neonGreen text-black w-full p-3 rounded-lg hover:scale-105 transition transform duration-200 shadow-lg"
            >
              Login
            </button>
  
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:scale-105 transition transform duration-200 shadow-lg"
            >
              Login with Google
            </button>
          </form>
  
          {/* Error Message */}
          {error && (
            <p className="mt-4 text-red-500 text-center text-lg font-semibold">
              {error}
            </p>
          )}
  
          <p className="mt-6 text-gray-400 text-center text-lg">
            Don't have an account?{" "}
            <Link to="/signup" className="text-neonGreen font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
  
        {/* Right Side Visual Banner */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-blue-800 via-black to-gray-900 p-8 relative">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-neonGreen mb-8">
            Login
          </h1>
          <p className="text-xl text-gray-300 text-center">
            Join the future of cryptocurrency trading
          </p>
  
          {/* Futuristic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black to-blue-900 opacity-50 rounded-xl"></div>
  
          {/* Chart Glow Effect */}
          <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-gradient-to-br from-neonGreen to-transparent opacity-40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-600 to-transparent opacity-30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </>
  );
  
};

export default Login;
