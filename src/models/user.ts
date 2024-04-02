import mongoose from "mongoose";

export type User = {
  name: string;
  username: string;
  password: string;
  role: string;
  isAdmin: boolean;
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.user || mongoose.model<User>("users", userSchema, "users");
