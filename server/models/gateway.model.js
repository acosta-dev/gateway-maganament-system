import mongoose from "mongoose";

const gatewaySchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: [true, "UID is required!"],
  },
  name: {
    type: String,
    required:[true, "Name is required!"],
  },
  ipv4: {
    type: String,
    required: [true, "IpV4 is required!"],
  },
  peripheral: {
    type: mongoose.Types.ObjectId,
    ref: "Peripheral",
  },
});

gatewaySchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('UID must be unique!!!'));
  } else {
    next();
  }
});

export default mongoose.model("Gateway", gatewaySchema);
