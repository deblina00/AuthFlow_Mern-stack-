const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 5006;
app.listen(port, () => {
  console.log(`Server is listening on port:${port}`);
});
