import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:8001/users")
      .then((response) => {
        console.log("Users:", response.data); // Debug: Log users
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);

    axios
      .put(`http://localhost:8001/users/${userId}`, { role: newRole })
      .catch((err) => console.error("Error updating role:", err));
  };

  const handleStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);

    axios
      .put(`http://localhost:8001/users/${userId}`, { status: newStatus })
      .catch((err) => console.error("Error updating status:", err));
  };

  const handleDeleteUser = (userId, userName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8001/users/${userId}`)
        .then(() => setUsers(users.filter((user) => user.id !== userId)))
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/adminhome"
                className="hover:underline text-lg font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:underline text-lg font-medium">
                Admin
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="py-10 px-6">
        <section className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Manage Users
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Email
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Role
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <select
                        className="bg-gray-100 rounded p-1"
                        value={user.role || ""}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <select
                        className="bg-gray-100 rounded p-1"
                        value={user.status || ""}
                        onChange={(e) =>
                          handleStatusChange(user.id, e.target.value)
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteUser(user.id, user.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
