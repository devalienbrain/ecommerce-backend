import { PrismaClient } from "@prisma/client";
import { is_live, store_id, store_passwd } from "../server.js";
import SSLCommerzPayment from "sslcommerz-lts";

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

    // return res.status(201).json({
    //   message: "Order created successfully",
    //   order,
    // });

    // SSLCommerz Payment integration Starts here
    const data = {
      total_amount: totalPriceToPay,
      currency: "BDT",
      tran_id: "REF123", // use unique tran_id for each api call
      success_url: "http://localhost:3030/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });
      console.log("Redirecting to: ", GatewayPageURL);
    });
    // SSLCommerz Payment integration Ends here
  } catch (error) {
    console.error("Error creating order:", error.message || error);
    return res.status(500).json({ error: "Failed to create order." });
  } finally {
    // await prisma.$disconnect();
  }
};
