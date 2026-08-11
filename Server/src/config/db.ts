import mongoose from "mongoose";
import env from "./env.js";
export default async function connectDB() {
   try {
     await mongoose.connect(env.MONGO_URI)
     console.log("MongoDB connected successfully");
   } catch (error) {
    console.error("Error connecting to MongoDB:", error);
   }
}
