import foodModel from "../models/food.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
//s3
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log(bucketName, region, accessKeyId, secretAccessKey);

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// export const addFood = async (req, res) => {
//   const { name, description, price, category } = req.body;
//   const file = req.file;

//   console.log(req.body, req.file);

//   req.file.buffer;

//   const params = {
//     Bucket: bucketName,
//     Body: req.file.buffer,
//     Key: req.file.originalname,
//     ContentType: req.file.mimetype,
//   };

//   const command = new PutObjectCommand(params);
//   await s3.send(command);
// };

export const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const file = req.file;

  console.log(req.body, req.file);

  // Ensure file buffer is available
  if (!file || !file.buffer) {
    return res.status(400).json({ error: "File is required" });
  }

  const params = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: file.originalname,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);

    // Construct the S3 URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${file.originalname}`;

    // Optionally, save the food item with the S3 URL in your database
    // For example: await foodModel.create({ name, description, price, category, imageUrl: s3Url });
    //     // Create a new food item
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: imageUrl, // Use the URL returned from S3
    });

    await food.save();
    return res.json({
      success: true,
      message: "Food item added Successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return res.status(500).json({ error: "Error uploading file" });
  }
};

// export const addFood = async (req, res) => {
//   const { name, description, price, category } = req.body;
//   const file = req.file; // Ensure you are getting the file correctly

//   try {
//     // Upload the file to S3
//     const imageUrl = await uploadFile3(file.buffer, file.originalname);

//     // Create a new food item
//     const food = new foodModel({
//       name,
//       description,
//       price,
//       category,
//       image: imageUrl, // Use the URL returned from S3
//     });

//     await food.save();
//     res.json({ success: true, message: "Food item added Successfully" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error adding food item" });
//   }
// };

//add food item
// export const addFood = async (req, res) => {
//   let image_filename = `${req.file.filename}`;

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });

//   try {
//     await food.save();
//     res.json({ success: true, message: "Food item added Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error adding food item" });
//   }
// };

//to display the list of all foods
export const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food from list
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed from list" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
