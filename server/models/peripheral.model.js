import mongoose from "mongoose";

const peripheralSchema = new mongoose.Schema({
    uid: {
      type: Number,
      unique: true,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    gateway: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gateway"
    }
  });

export default mongoose.model("Peripheral", peripheralSchema);