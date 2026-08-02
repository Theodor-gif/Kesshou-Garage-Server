import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      maxlength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    part: {
      type: Schema.Types.ObjectId,
      ref: "Part",
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Comment", commentSchema);
