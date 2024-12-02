import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  const { name, price, category, inventory, image } = req.body;
  const { userId } = req;

  try {
    const product = await prisma.product.create({
      data: { name, price, category, inventory, image, createdBy: userId },
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
