import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    part: { type: Schema.Types.ObjectId, ref: "Part", required: true },
    quantity: {
      type: Number,
      reguired: true,
      min: [1, "Qauntity must be at least 1"],
      default: 1,
    },
    price: { type: Number, required: true, min: 0 },
  },
  { id: false },
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unigue: true,
    },
    items: { type: [cartItemSchema], required: true },
    total: { type: Number, required: true },
  },
  {
    timestamp: true,
  },
);

export default model("Cart", cartSchema);
