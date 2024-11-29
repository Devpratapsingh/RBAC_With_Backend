import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no token or role is found, redirect to login
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("email");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!userRole) {
      setError("User role not found.");
      return;
    }

    // Fetch user info using axios
    axios
      .get("http://localhost:8001/users")
      .then((response) => {
        const users = response.data;
        const loggedInUser = users.find(
          (u) => u.role === userRole && u.email === email
        );
        console.log(response);
        if (loggedInUser) {
          setUser(loggedInUser);
        } else {
          setError("User not found.");
        }
      })
      .catch((err) => {
        setError("Error fetching user details.");
        console.error("Error fetching user:", err);
      });
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6">User Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {user ? (
        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Welcome, {user.name}!
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span>{user.role}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  user.status === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {user.status}
              </span>
            </li>
          </ul>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-400 mt-6">Loading user details...</p>
      )}
    </div>
  );
};

export default UserDashboard;
