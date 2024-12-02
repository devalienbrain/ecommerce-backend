const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

module.exports = app;
