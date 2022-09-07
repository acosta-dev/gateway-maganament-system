import mongoose from "mongoose";

const gatewaySchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  ipv4: {
    type: String,
  },
  peripheral: {
    type: mongoose.Types.ObjectId,
    ref: "Peripheral",
  },
});

export default mongoose.model("Gateway", gatewaySchema);
