import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const remainingUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(200).json({message: "users fetched successfully", users: remainingUsers})
    } catch (error) {
        return res.status(500).json({message: error.message || "something went wrong"})
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({message: error.message || "something went wrong"});
    }
}