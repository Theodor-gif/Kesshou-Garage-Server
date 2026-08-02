import { Schema, model } from "mongoose";

const factoryColorsSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false },
);

const specsSchema = new Schema(
  {
    engineCode: { type: String, required: true },
    displacement: { type: String, required: true },
    transmission: { type: String, required: true },
    topSpeed: { type: String, required: true },
    acceleration: { type: String, required: true },
    power: { type: String, required: true },
    torque: { type: String, required: true },
    weight: { type: String, required: true },
    weightDistribution: { type: String, required: true },
    drivetrain: { type: String, required: true },
    wheelbase: { type: String, required: true },
    bodyStyle: { type: String, required: true },
    differential: { type: String, required: true },
    factoryLsd: { type: Boolean, required: true },
    productionYears: { type: String, required: true },
    factoryColors: { type: [factoryColorsSchema] },
  },
  { _id: false },
);

const photoSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    order: { type: Number, required: true },
  },
  { _id: false },
);

const spotlightSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const carSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    released: { type: String, required: true },
    specs: { type: specsSchema, required: true },
    photos: { type: [photoSchema], default: [] },
    spotlight: { type: [spotlightSchema], default: [] },
  },
  { timestamps: true },
);

export default model("Car", carSchema);
