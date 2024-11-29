import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dotenv from "dotenv";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        email,
        name,
        password,
        role,
        status,
      };
      console.log("Payload:", payload); // Log the payload

      const response = await axios.post(
        `http://localhost:8001/signup`,
        payload
      );

      setEmail("");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error signing up");
      console.log("Error:", error.response?.data || error.message); // Log the error response
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col justify-center items-center text-white font-sans">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-black bg-opacity-60 p-6 rounded-lg shadow-lg"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-600 rounded text-center text-white">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-lg">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-lg">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 rounded bg-gray-700 text-white pr-10" // Adjust padding
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center py-7 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full px-8 py-3 bg-purple-600 rounded-lg text-white font-semibold shadow-md hover:bg-purple-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
