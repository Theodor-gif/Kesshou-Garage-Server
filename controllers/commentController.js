import commentModel from "../models/comment.model.js";

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await commentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch comments", error });
  }
};

export const getCommentsForPart = async (req, res, next) => {
  try {
    const comments = await commentModel.find({ part: req.params.partid });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Comments not found", error });
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { partid } = req.params;
    const author = req.user.id;

    const comment = await commentModel.create({
      text,
      author,
      part: partid,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Could not create comment", error });
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own comments" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Not able to update this comment", error });
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete comment", error });
  }
};
