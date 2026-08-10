import productModel from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
