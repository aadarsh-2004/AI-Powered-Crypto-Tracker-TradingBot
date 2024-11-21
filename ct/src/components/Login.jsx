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
      <div className='flex flex-col md:flex-row h-screen bg-gray-100'>
        {/* Left side form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white w-full p-3 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>

            {/* Google Login Button */}
            <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-600 transition duration-200">
            Login with Google
            </button>

          </form>

          

          {/* Error message */}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right side with "Login" banner */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-orange-500 text-white p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Login</h1>
        </div>
      </div>
    </>
  );
};

export default Login;
