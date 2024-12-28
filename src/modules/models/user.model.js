import mongoose from "mongoose";
import { hashPassword } from "../../utils/bcrypt/bcrypt.utils.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    }
  },
  {
    timestamps:true
  }
);

// Hash password before saving a new user
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Hash password before updating a user
userSchema.pre(/updateMany/i, async function (next) {
  if (!this._update.password) return next();
  try {
    this._update.password = hashPassword(this._update.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
