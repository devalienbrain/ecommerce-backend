import express from "express";
import { getAllUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);

export const userRoutes = router;
