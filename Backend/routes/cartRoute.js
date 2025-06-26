import express from "express";

import { addToCart } from "../controllers/cart.controller.js";
import { removeFromCart } from "../controllers/cart.controller.js";
import { getCart} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.js";

// import { Router } from "express";


const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.get("/get",authMiddleware,getCart);

export default cartRouter;