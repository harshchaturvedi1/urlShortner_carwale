import mongoose from "mongoose";

// Define the schema for storing URL details
const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true }, // Shortened URL identifier
    originalUrl: { type: String, required: true }, // The actual URL
    clickCount: { type: Number, default: 0 }, // Number of times the short URL was clicked
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional reference to the user who created it
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create and export the URL model
const Url = mongoose.model("Url", urlSchema);
export default Url;
