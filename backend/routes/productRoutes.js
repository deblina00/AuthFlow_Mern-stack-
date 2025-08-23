const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  ProductController.addProduct
);

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  ProductController.updateProduct
);

router.delete("/:id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
