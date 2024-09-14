import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.util.js";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { inputs: {fullName, username, password, confirmPassword, gender} } = req.body;

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
  try {
    const { username, password } = req.body;
    if ([username, password].some((val) => !val)) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "username not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      message: "user signin successfully",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "something went wrong" });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "user signout successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "something went wrong" });
  }
};
