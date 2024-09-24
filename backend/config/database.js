import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.wjldf.mongodb.net/yumzy`
    )
    .then(() => {
      console.log("Connected to mongodb database");
    });
};
