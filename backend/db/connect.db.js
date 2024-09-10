import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO}`)
        console.log("MongoDb is Connected");
    } catch (error) {
        console.log("MongoDB connection error ", error);
    }
}