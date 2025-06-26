import express from "express";
import  authMiddleware from "../middleware/auth.js";
import placeOrder, { verifyOrder } from "../controllers/Order.controller.js"; // ✅ Add ".js" at the end

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder)

export default orderRouter;
