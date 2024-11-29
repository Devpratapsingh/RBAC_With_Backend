import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true, default: "Active" },
});

const User = mongoose.model("User", userSchema, "userData");

const roleSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true },
});

const Role = mongoose.model("Role", roleSchema, "roleData");

const JWT_SECRET = process.env.ACCESS_TOKEN;

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error in fetching user data:", error);
    res.status(500).send("Server error");
  }
});

app.get("/roles", async (req, res) => {
  try {
    const roles = await Role.find();
    res.send(roles);
  } catch (error) {
    console.error("Error in fetching roles:", error);
    res.status(500).send("Server error");
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { id }, // Find user by ID
      { role, status }, // Update role and status
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
});

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
