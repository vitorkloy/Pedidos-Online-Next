import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true } // Em produção, use bcrypt!
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
