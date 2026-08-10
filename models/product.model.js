import { Schema, model } from "mongoose";

const partSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    compatibleWith: [String],
    specs: { type: Schema.Types.Mixed },
    whatsInTheBox: [String],
    kitFeatures: [String],
    brandImage: { type: String },
    categoryName: { type: String, required: true },
  },
  { timestamps: true },
);

export default model("Part", partSchema);
