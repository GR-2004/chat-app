import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    // const token = req.cookies?.accessToken;
    const token = req.cookies.jwt
    // console.log("token", token)
    if (!token) {
      return res.status(401).json("Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decodedToken", decodedToken)
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Invalid Access Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "something went wrong" });
  }
};
