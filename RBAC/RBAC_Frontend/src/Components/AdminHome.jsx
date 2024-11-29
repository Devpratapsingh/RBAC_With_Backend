import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  useEffect(() => {
    // Fetch the statistics of users
    axios
      .get("http://localhost:8001/users")
      .then((response) => {
        const users = response.data;
        setTotalUsers(users.length);
        setActiveUsers(users.filter((user) => user.status === "Active").length);
        setInactiveUsers(
          users.filter((user) => user.status === "Inactive").length
        );
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
                onClick={() => {
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("role");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="py-10 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Welcome, Admin!
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-purple-600">{totalUsers}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Active Users
            </h3>
            <p className="text-4xl font-bold text-blue-600">{activeUsers}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Inactive Users
            </h3>
            <p className="text-4xl font-bold text-red-600">{inactiveUsers}</p>
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/admin"
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md text-center"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/roles"
              className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-md text-center"
            >
              Manage Roles
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 py-4 text-center text-gray-700 mt-10">
        <p>&copy; 2024 Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminHome;
