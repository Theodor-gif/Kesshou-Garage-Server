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
app.use(
  cors({
    origin: "",
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

// Server running

connectDB().then(() => {
  app.listen(
    PORT,
    console.log("Server is running on port " + process.env.PORT),
  );
});
