import { Schema, model } from "mongoose";

const partSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Coilovers",
        "Braking",
        "Wheels",
        "Steering",
        "Flywheel/Clutch",
        "Lighting",
      ],
    },
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    compatibleWith: { type: [String], default: [] },

    whatsInTheBox: { type: [String], default: [] },
    kitFeatures: { type: [String], default: [] },

    brandImage: { type: String, default: "" },
  },
  { timestamps: true },
);

export default model("Part", partSchema);
