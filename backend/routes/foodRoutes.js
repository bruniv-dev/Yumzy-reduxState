import express from "express";
import {
  addFood,
  editFood,
  foodList,
  getFoodById,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.get("/:foodId", getFoodById);
foodRouter.post("/remove", removeFood);
foodRouter.put("/edit/:foodId", upload.single("image"), editFood);

export default foodRouter;
