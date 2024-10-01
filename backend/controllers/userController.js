import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import validator from "validator";
import { sendWelcomeEmail } from "../config/nodemailer.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY);
};

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body; // Include phoneNumber
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const user = await newUser.save();

    await sendWelcomeEmail(user.email, user.name);
    // `    await sendWelcomeSMS(
    //       user.phoneNumber,
    //       "Thankyou for choosing us. Happy Eatng, Yumzy!"
    //     ); // Send SMS`

    const token = createToken(user._id, user.role);
    res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to register user" });
  }
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" }); // Use return here
    }

    const token = createToken(user._id, user.role);

    return res.json({ success: true, token, role: user.role }); // Use return here
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Occurred" }); // Use return here
  }
};

import { OAuth2Client } from "google-auth-library";
import { sendWelcomeSMS } from "../config/twilio.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google login route
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await userModel.findOne({ email });

    if (!user) {
      // Register the user if they don't exist
      user = new userModel({
        name,
        email,
        password: bcrypt.hashSync(email + process.env.JWT_SECRET_KEY, 10), // Dummy password for OAuth users
        role: "user",
      });
      await user.save();
      await sendWelcomeEmail(user.email, user.name);
    }

    const jwtToken = createToken(user._id, user.role);
    res.json({
      success: true,
      token: jwtToken,
      role: user.role,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.json({ success: false, message: "Google Login Failed" });
  }
};
