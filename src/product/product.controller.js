const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  deleteProductById,
} = require("./product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);

    res.status(200).send({
      product: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Error creating product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productid = req.params.id;
    await deleteProductById(parseInt(productid));
    res.status(200).send("Product Successfuly Deletes");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.status(200).send({
      data: product,
      message: "Product Successfuly Updated",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const product = await editProductById(parseInt(productId), productData);

  res.status(200).send({
    data: product,
    message: "Product updated successfully",
  });
});

module.exports = router;
