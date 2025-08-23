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

<<<<<<< HEAD
=======
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://authflow-frontend-side.onrender.com",
];

>>>>>>> 72c4029ed7773a9ed5ff8ebff27fbd8a953e73f8
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 5006;
app.listen(port, () => {
  console.log(`Server is listening on port:${port}`);
});
