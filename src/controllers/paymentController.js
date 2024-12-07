import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createPayment = async (req, res) => {
  const {
    userId,
    userEmail,
    userName = "N/A",
    userPhone = "N/A",
    userAddress = "N/A",
    totalPriceToPay,
    productIds = [], // Optional array of product IDs
  } = req.body;

  // Validate required fields
  if (!userId || !userEmail || !totalPriceToPay) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Validate user existence
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate the products if product IDs are provided
    let products = [];
    if (productIds.length > 0) {
      products = await prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (products.length !== productIds.length) {
        return res.status(400).json({ error: "Some products were not found." });
      }
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } }, // Connect existing user by userId
        totalPrice: totalPriceToPay,
        products: {
          connect: products.map((product) => ({ id: product.id })), // Connect products to the order
        },
      },
      include: {
        products: true, // Include product details in the response
      },
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error.message || error);
    return res.status(500).json({ error: "Failed to create order." });
  } finally {
    // await prisma.$disconnect();
  }
};
