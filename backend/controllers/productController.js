// import Product from "../models/Product.js";

// // export const addProduct = async (req, res) => {
// //   const { name, description, price } = req.body;
// //   const image = req.file ? req.file.filename : null;
// //   try {
// //     const product = new Product({
// //       name,
// //       description,
// //       price,
// //       image,
// //       createdBy: req.user._id,
// //     });
// //     await product.save();
// //     res.status(201).json(product);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // export const getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find();
// //     res.json(products);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // export const updateProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });

// //     product.name = req.body.name || product.name;
// //     product.description = req.body.description || product.description;
// //     product.price = req.body.price || product.price;
// //     if (req.file) product.image = req.file.filename;

// //     await product.save();
// //     res.json(product);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Product = require("../models/Product.js");

class ProductController {
  static async addProduct(req, res) {
    const { name, description, price, category, color, isBestSeller } =
      req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = new Product({
        name,
        description,
        price,
        category,
        color,
        isBestSeller,
        image,
        createdBy: req.user._id,
        isDeleted: false, // initialize as not deleted
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error("Add Product Error:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getProducts(req, res) {
    try {
      const { minPrice, maxPrice, category, color, bestSeller } = req.query;

      const filter = { isDeleted: false };

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      if (category) filter.category = category;
      if (color) filter.color = color;
      if (bestSeller === "true") filter.isBestSeller = true;

      const products = await Product.find(filter);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        isDeleted: false,
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        isDeleted: false,
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.color = req.body.color || product.color;
      product.isBestSeller = req.body.isBestSeller ?? product.isBestSeller;

      if (req.file) product.image = req.file.filename;

      await product.save();

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product || product.isDeleted)
        return res
          .status(404)
          .json({ message: "Product not found or already deleted" });

      product.isDeleted = true;
      await product.save();

      res.json({ message: "Product soft deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ProductController;
