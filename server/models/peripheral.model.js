import mongoose from "mongoose";

const peripheralSchema = new mongoose.Schema({
    uid: {
      type: Number,
      unique: true,
      required: [true, "UID is required!"],
    },
    vendor: {
      type: String,
      required: [true, "Vendor is required!"],
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

  peripheralSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('UID must be unique!!!'));
    } else {
      next();
    }
  });

export default mongoose.model("Peripheral", peripheralSchema);