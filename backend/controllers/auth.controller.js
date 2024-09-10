import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username is already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "something went wrong while user signup",
    });
  }
};


export const signin = async (req, res) => {

}

export const signout = async (req, res) => {

}