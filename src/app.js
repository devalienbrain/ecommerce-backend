import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
