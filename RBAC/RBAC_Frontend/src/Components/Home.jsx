import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Example for making an API call if needed (you can remove if unnecessary)
    // You can fetch some initial data here if required, or leave it empty for now
    // axiosInstance.get("/some-api-endpoint").then(response => console.log(response)).catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col justify-between items-center text-white font-sans">
      <header className="w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-60">
        <h1 className="text-3xl font-bold tracking-wide">RBAC</h1>
        <nav className="flex space-x-6">
          <Link
            to="/about"
            className="hover:text-purple-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-purple-300 transition duration-200"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center text-center mt-20">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to RBAC!</h2>
        <p className="mb-8 text-gray-300 text-lg max-w-md">
          Simplify access control with a secure and intuitive platform.
        </p>
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-purple-600 rounded-lg text-white font-semibold shadow-md hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-gray-800 rounded-lg text-white font-semibold shadow-md hover:bg-gray-700 transition duration-200"
          >
            Signup
          </button>
        </div>
      </main>

      <footer className="w-full px-6 py-4 bg-black bg-opacity-60 text-center text-sm">
        <p className="text-gray-400">
          © 2024 RBAC. All rights reserved. |{" "}
          <Link to={"/PrivacyPolicy"} className="hover:text-purple-300">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Home;
