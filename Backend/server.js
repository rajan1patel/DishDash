import express from "express";
import cors from "cors";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

dotenv.config({ path: "./.env" });

// App config
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API working");
});

// Database connection
connectdb();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);  // Uncommented this line

// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully on http://localhost:${PORT}`);
});
