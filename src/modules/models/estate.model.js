import mongoose from "mongoose";

const estateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Estate name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["residential", "commercial", "industrial"],
      required: [true, "Estate type is required"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
        match: [/^\d{5}(-\d{4})?$/, "Invalid postal code format"],
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {timestamps: true},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Custom validator for image array length
function arrayLimit(val) {
  return val.length <= 10;
}

// Virtual field for related repairs (if applicable)
estateSchema.virtual("repairs", {
  ref: "Repair",
  localField: "_id",
  foreignField: "propertyId",
});

const Estate = mongoose.model("Estate", estateSchema);
export default Estate;
