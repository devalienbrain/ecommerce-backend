import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);


export const productRoutes = router;
