import productModel from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    if (!products) {
      return res.status(400).json({ message: "Products not found", error });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Products not found", error });
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productid);

    if (!product) {
      return res.status(400).json({ message: "Product not found", error });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Products not found", error });
  }
};
