import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authenticateToken, addToCart);
cartRouter.post("/remove", authenticateToken, removeFromCart);
cartRouter.post("/get", authenticateToken, getCart);

export default cartRouter;
