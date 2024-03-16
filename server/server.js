const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./Config/db");
const UserModel = require("./Models/UserModel");
const UserRouter = require("./Routes/UserRoute");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/users", UserRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
