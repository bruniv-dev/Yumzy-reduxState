import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY);
};

//registerUser
export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
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
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "user",
    });

    const user = await newUser.save();

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

//login user
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
      res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(user._id, user.role);

    res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

import { OAuth2Client } from "google-auth-library";

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
