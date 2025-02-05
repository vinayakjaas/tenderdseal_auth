import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://tendersealbackend.tenderseal.com/api/v1"; // Backend URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle login and redirect based on userId from API response
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    console.log("🔄 Logging in with", email, password);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for backend-managed cookies
        body: JSON.stringify({ email, password }),
      });

      console.log("📩 Server Response:", response);

      const data = await response.json();
      console.log("📦 Parsed Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Expecting `userId` in the response
      if (data.userId) {
        console.log("✅ Login successful! User ID:", data.userId);
        setMessage("Login successful! Redirecting...");
        navigate(`/dashboard/${data.userId}`);
      } else {
        throw new Error("User ID missing from response.");
      }
    } catch (err) {
      console.error("🔥 Login Error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800">TenderSeal</h1>
        <p className="text-center text-gray-600 mb-6">Log in to your account</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Your Email Address"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Your Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
