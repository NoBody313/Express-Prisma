const express = require("express");
const dotenv = require("dotenv");

const app = express();
const productController = require("./product/product.controller")

const PORT = process.env.PORT;


app.use(express.json());
dotenv.config();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productController)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
