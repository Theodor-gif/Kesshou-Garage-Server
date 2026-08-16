import cartModel from "../models/cart.model.js";
import partModel from "../models/product.model.js"; // ⚠️ confirm this filename matches your models/ folder

export const addPart = async (req, res, next) => {
  try {
    const { product } = req.body; // { product: partId, quantity }

    if (!product || !product.product || !product.quantity) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const foundPart = await partModel.findById(product.product);

    if (!foundPart) {
      return res.status(404).json({ message: "Part not found" });
    }

    const price = foundPart.price;
    const quantity = product.quantity;

    let cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) {
      cart = await cartModel.create({
        user: req.user.id,
        items: [{ part: foundPart._id, price, quantity }],
        total: (price * quantity).toFixed(2),
      });

      return res
        .status(201)
        .json({ message: "Cart created and product added successfully", cart });
    }

    const productInCart = cart.items.find((item) => {
      return item.part.toString() === foundPart._id.toString();
    });

    if (productInCart) {
      productInCart.quantity += quantity;
      productInCart.price = price;
    } else {
      cart.items.push({ part: foundPart._id, price, quantity });
    }

    cart.total = cart.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

    await cart.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartModel.findOne({ user: req.user.id }).populate({
      path: "items.part",
    });

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body || {}; // guard against missing body

    const cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(400).json({ message: "Cart doesn't exist" });
    }

    const item = cart.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const amountToRemove = quantity || 1;

    if (item.quantity > amountToRemove) {
      item.quantity -= amountToRemove;
    } else {
      cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    }

    cart.total = cart.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

    await cart.save();

    await cart.populate("items.part");

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    next(error);
  }
};
