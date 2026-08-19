// imports

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config.js";
import connectDB from "./db/mongoose.connect.js";
import userRoutes from "./routes/user.routes.js";
import commentRoutes from "./routes/comment.route.js";
import carRoutes from "./routes/car.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// midlewares

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
// Clean up the URL string to strip away any accidental trailing slashes
const cleanClientUrl = (
  process.env.CLIENT_URL || "http://localhost:5173"
).replace(/\/$/, "");

app.use(
  cors({
    origin: [
      cleanClientUrl,
      "https://kesshou-garage-client-five.vercel.app", // Explicitly backup the exact string without slash
    ],
    credentials: true,
  }),
);

app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/cars", carRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(401).json({ message: "Invalid or expired token" });
});

// Server running

connectDB().then(() => {
  app.listen(
    PORT,
    console.log("Server is running on port " + process.env.PORT),
  );
});
