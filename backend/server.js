import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";

//app config
const app = express();
const port = process.env.PORT || 5000;

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//middleware
//frontend to backend request will be parsed using json
app.use(express.json());
//can access backend from any frontend
app.use(cors());

//database connection
connectDB();

//routes -- api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//req data from server
app.get("/", (req, res) => {
  res.send("hello from yumzy");
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
