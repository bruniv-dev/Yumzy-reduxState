import express from "express";
import { submitContactForm } from "../controllers/contactController.js";

const contactRouter = express.Router();

// Define the POST route for contact form submission
contactRouter.post("/send-contact-form", submitContactForm);

export default contactRouter;
