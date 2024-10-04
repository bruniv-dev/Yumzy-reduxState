import Contact from "../models/contact.js";
import { sendAdminContactEmail } from "../config/nodemailer.js";

// Controller function to handle contact form submission
export const submitContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Create a new contact instance with the form data
  const newContact = new Contact({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  try {
    // Save the contact data to the database
    await newContact.save();

    // Send an email to the admin
    await sendAdminContactEmail({ firstName, lastName, email, phone, message });

    // Respond with success
    res.status(200).json({ message: "Contact form data saved and email sent" });
  } catch (error) {
    console.error("Error saving contact data or sending email: ", error);
    // Respond with an error message
    res.status(500).json({ message: "Error submitting contact form" });
  }
};
