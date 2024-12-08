import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("E-commerce App Server Running..")
})

// Paymemnt sslcommerz integration part
export const store_id = process.env.SSLCOMMERZ_STORE_ID;
export const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
export const is_live = false; //true for live, false for sandbox
