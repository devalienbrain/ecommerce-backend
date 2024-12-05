import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  const { name, price, category, inventory, image, createdBy } = req.body;

  if (!createdBy) {
    return res.status(400).json({ error: "Missing createdBy field" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        inventory,
        image,
        User: {
          connect: { id: createdBy }, // Ensure `createdBy` exists in the User table
        },
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Product Creation Error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: true, // Include category details
      },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
