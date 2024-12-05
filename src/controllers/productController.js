import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createProduct = async (req, res) => {
  const { name, price, categoryId, inventory, image, createdBy } = req.body;

  if (!createdBy || !categoryId) {
    return res.status(400).json({ error: "Missing required fields: createdBy or categoryId" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price), // Ensure price is a number
        inventory: parseInt(inventory, 10), // Ensure inventory is a number
        image,
        User: {
          connect: { id: parseInt(createdBy, 10) }, // Link product to a user
        },
        Category: {
          connect: { id: parseInt(categoryId, 10) }, // Link product to a category
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
        Category: true, 
      },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
