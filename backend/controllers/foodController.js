import foodModel from "../models/food.js";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
//s3
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log(bucketName, region, accessKeyId, secretAccessKey);

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

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
    console.log(`image url in add food ${imageUrl}`);

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: imageUrl,
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

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Extract the S3 key from the image URL
    const imageUrl = food.image;
    const imageKey = imageUrl.split(
      `${bucketName}.s3.${region}.amazonaws.com/`
    )[1];

    console.log(`image url in remove food ${imageUrl}`);
    console.log(imageKey);
    // Delete image from S3
    const deleteParams = {
      Bucket: bucketName,
      Key: imageKey,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);

    await s3.send(deleteCommand);

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food item and image removed successfully",
    });
  } catch (error) {
    console.error("Error removing food item:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing food item" });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const { id: foodId } = req.params; // Destructure foodId from params
    const foodItem = await Food.findById(foodId); // Find food by ID

    if (!foodItem) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Respond with the found food item
    return res.status(200).json({
      success: true,
      data: foodItem,
    });
  } catch (error) {
    console.error("Error fetching food item:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not retrieve food item.",
    });
  }
};

export const editFood = async (req, res) => {
  const { foodId } = req.params; // Use params for foodId
  const { name, description, price, category } = req.body;
  const file = req.file;

  try {
    // Find the food item by ID
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    let newImageUrl = food.image;

    // If a new image file is uploaded
    if (file && file.buffer) {
      // Delete the old image from S3 if it exists
      if (food.image) {
        const imageUrl = food.image;
        const imageKey = imageUrl.split(
          `${bucketName}.s3.${region}.amazonaws.com/`
        )[1];

        const deleteParams = {
          Bucket: bucketName,
          Key: imageKey,
        };
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await s3.send(deleteCommand);
      }

      // Upload the new image to S3
      const newParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: file.originalname,
        ContentType: file.mimetype,
      };
      const uploadCommand = new PutObjectCommand(newParams);
      await s3.send(uploadCommand);

      // Update the new image URL
      newImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${file.originalname}`;
    }

    // Update food fields with new data or keep old data if not provided
    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    food.image = newImageUrl;

    // Save the updated food item
    await food.save();

    // Respond with the updated food item
    res.json({
      success: true,
      message: "Food item updated successfully",
      food,
    });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({
      success: false,
      message: "Error updating food item",
    });
  }
};
