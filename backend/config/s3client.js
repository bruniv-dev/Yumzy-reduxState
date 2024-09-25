// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// // Create an S3 client
// const s3Client = new S3Client({
//   region: process.env.AWS_BUCKET_REGION, // Your AWS region
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Key
//   },
// });

// // /**
// //  * Uploads a file to S3
// //  * @param {Buffer} fileBuffer - The file buffer to upload
// //  * @param {string} fileName - The name to save the file as in S3
// //  * @returns {Promise<string>} - The URL of the uploaded file
// //  */
// // export const uploadFileToS3 = async (fileBuffer, fileName) => {
// //   const uploadParams = {
// //     Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
// //     Key: `images/${fileName}`, // The folder and file name in S3
// //     Body: fileBuffer, // The file buffer
// //   };

// //   try {
// //     const command = new PutObjectCommand(uploadParams);
// //     const response = await s3Client.send(command);
// //     console.log("File uploaded successfully:", response);

// //     // Construct the file URL
// //     return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/images/${fileName}`;
// //   } catch (error) {
// //     console.error("Error uploading file:", error);
// //     throw error; // Throw error for further handling
// //   }
// // };

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import mime from "mime-types"; // Add this to handle mime types

// export const uploadFileToS3 = async (fileBuffer, fileName) => {
//   const mimeType = mime.lookup(fileName) || "application/octet-stream"; // Default to binary stream

//   const uploadParams = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: fileName,
//     Body: fileBuffer,
//     ContentType: mimeType, // Set content type dynamically
//   };

//   try {
//     const command = new PutObjectCommand(uploadParams);
//     const response = await s3Client.send(command);
//     console.log("File uploaded successfully:", response);

//     // Construct the file URL
//     return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/food-images/${fileName}`;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error; // Rethrow error for further handling
//   }
// };

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// console.log(bucketName, region, accessKeyId, secretAccessKey);

// const s3Client = new S3Client({
//   region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey,
//   },
// });

// export async function uploadFile(fileBuffer, fileName, mimetype) {
//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileBuffer,
//     Key: fileName,
//     ContentType: mimetype,
//   };
//   const command = new PutObjectCommand(uploadParams);

//   console.log("Upload data:", data);
//   return {
//     Key: fileName,
//   };
// }
