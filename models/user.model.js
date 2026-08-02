import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      maxlength: 18,
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
    },
    email: { type: String, required: [true, "Email is required"], trim: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export default model("User", userSchema);
