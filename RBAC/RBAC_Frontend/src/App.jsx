import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Admin from "./Components/Admin";
import UserDashboard from "./Components/UserDashboard"
import AdminHome from "./Components/AdminHome";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/adminhome" element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
