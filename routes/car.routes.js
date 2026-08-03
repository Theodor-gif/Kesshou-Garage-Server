import express from "express";
const router = express.Router();
import { getOneCar, getAllCars } from "../controllers/carController.js";

router.get("/:carid", getOneCar);
router.get("/", getAllCars);

export default router;
