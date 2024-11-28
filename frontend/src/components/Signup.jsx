// src/Signup.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneSignup = async () => {
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("Recaptcha resolved:", response);
      },
    }, auth);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      const verificationCode = prompt("Enter the verification code sent to your phone:");
      await confirmationResult.confirm(verificationCode);
      alert("Phone number verified successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
       <div className="flex flex-col md:flex-row h-screen bg-gradient-to-tr from-blue-900 via-gray-900 to-black text-white">
        {/* Left side form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-darkBg shadow-2xl rounded-lg p-8 border border-gray-800">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSignup} className="w-full max-w-sm">
            <div className="mb-4">
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
            <div className="mb-4">
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
              Sign Up
            </button>
            
            {/* Google sign-in */}
             {/* Google Login Button */}
             <button
              onClick={handleGoogleSignup}
              className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:scale-105 transition transform duration-200 shadow-lg"
            >
              SignUp with Google
            </button>
          </form>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

          

          {/* Phone sign-in
          <div className="mt-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePhoneSignup}
              className="bg-orange-500 text-white w-full p-3 rounded-md mt-4 hover:bg-orange-600 transition duration-200"
            >
              Sign Up with Phone Number
            </button>
          </div> */}

          <p className="mt-6 text-gray-400 text-center text-lg">
            Don't have an account?{" "}
            <Link to="/" className="text-neonGreen font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right side with "Sign Up" banner */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-blue-900 via-black to-gray-900 p-8 relative">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-neonGreen mb-8">
            SignUp
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

      {/* Recaptcha container */}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Signup;
