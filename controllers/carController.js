import carModel from "../models/car.model.js";

export const getOneCar = async (req, res, next) => {
  try {
    const car = await carModel.findById(req.params.carid);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getAllCars = async (req, res, next) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Cars not found" });
  }
};
