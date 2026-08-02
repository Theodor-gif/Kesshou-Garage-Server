// imports

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config.js";
import connectDB from "./db/mongoose.connect.js";

const app = express();
const PORT = process.env.PORT || 8080;

// midlewares

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Server running

connectDB().then(() => {
  app.listen(
    PORT,
    console.log("Server is running on port " + process.env.PORT),
  );
});
