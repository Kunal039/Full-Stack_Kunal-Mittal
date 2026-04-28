import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: ""
    },
    provider: {
      type: String,
      enum: ["local"],
      default: "local"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
