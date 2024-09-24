import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.amzfb.mongodb.net/yumzy-reduxState`
    )
    .then(() => {
      console.log("Connected to mongodb database");
    });
};
