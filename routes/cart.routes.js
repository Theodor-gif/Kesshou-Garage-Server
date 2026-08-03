import express from "express";
import {
  addPart,
  getCart,
  removeItemFromCart,
} from "../controllers/cartController.js";
import isAuth from "../middleware/isAuth.js"; // whatever gives you req.user

const router = express.Router();

router.post("/add", isAuth, addPart);
router.get("/", isAuth, getCart);
router.delete("/:itemId", isAuth, removeItemFromCart);

export default router;
