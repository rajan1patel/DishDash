import express from "express";
import { addfood } from "../controllers/food.controller.js";
import { listfood } from "../controllers/food.controller.js";
import { removefood } from "../controllers/food.controller.js";

import multer from "multer";

const foodRouter = express.Router();

//image storage engine
// const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// module.exports = upload;

foodRouter.post("/add", upload.single("image"), addfood);

foodRouter.get("/list", listfood);

foodRouter.post("/remove", removefood);

export default foodRouter;
