const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      //   type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
      //   ref: "Category",
    },
    brand: {
      type: String,
      required: true,
      //   enum: ["Apple", "Samsung", "Lenovo"],
    },
    quantity: {
      type: Number,
      required: true,
      // select: false,
    },
    sold: {
      type: Number,
      default: 0,
      // select: false,
    },
    images: [],
    color: {
      type: String,
      enum: ["Black", "Brown", "Red"],
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRatings: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
