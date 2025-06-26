import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Corrected the type for userId
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, default: Date.now }, // Removed unnecessary parentheses in default
  payment: { type: Boolean, default: false }
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
