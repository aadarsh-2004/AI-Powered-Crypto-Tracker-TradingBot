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
      <div className='flex flex-col md:flex-row h-screen bg-gray-100'>
        {/* Left side form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSignup} className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
                value={email}
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
              Sign Up
            </button>
            
            {/* Google sign-in */}
            <button
            onClick={handleGoogleSignup}
            className="bg-blue-500 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
          >
            Sign Up with Google
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

          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-bold">
              Login
            </Link>
          </p>
        </div>

        {/* Right side with "Sign Up" banner */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-orange-500 text-white p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Sign Up</h1>
        </div>
      </div>

      {/* Recaptcha container */}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Signup;
