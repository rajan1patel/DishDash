
import userModel from "../models/user.model.js";


// controllers/cart.controller.js
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // ← Get user ID from decoded token

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    let cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    const { itemId } = req.body;
    if (!itemId || !cartData[itemId]) {
      return res.status(400).json({ success: false, message: "Item not in cart" });
    }

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Problem occurred" });
  }
};



const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Problem occurred" });
  }
};


export {addToCart,removeFromCart,getCart}