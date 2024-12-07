import express from "express";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Payments
router.post("/", createPayment);

export const paymentRoutes = router;