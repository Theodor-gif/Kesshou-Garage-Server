import { getAllUsers, register, login } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
