import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is not set. Running with in-memory fallback.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.warn("MongoDB connection failed. Running with in-memory fallback.");
    console.warn(error.message);
    return false;
  }
}
