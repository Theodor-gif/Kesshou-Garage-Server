import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  getCommentsForPart,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Public — anyone can read comments
router.get("/parts/:partId/comments", getCommentsForPart);

// Protected — must be logged in
router.post("/parts/:partid/comments", isAuth, createComment);
router.put("/comments/:id", isAuth, updateComment);
router.delete("/comments/:id", isAuth, deleteComment);

export default router;
