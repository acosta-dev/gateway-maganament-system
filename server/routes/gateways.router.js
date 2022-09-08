import express from "express";
import Gateway from "../models/gateway.model.js";
import Peripheral from "../models/peripheral.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const gateways = await Gateway.find();
    res.status(200).json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.id);
    if (gateway) {
      const peripheral = await Peripheral.find({ gateway: req.params.id });
      return res.status(200).json({ gateway, peripheral });
    } else {
      return res.status(404).json({ messsage: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create a new gateway
router.post("/", async (req, res) => {
  if (!ValidIP(req.body.ipv4)) {
    return res.status(400).json({ message: "Invalid IP Format." });
  }
  const gateway = new Gateway({
    uid: req.body.uid,
    name: req.body.name,
    ipv4: req.body.ipv4,
  });

  try {
    const newGateway = await gateway.save();
    res.status(201).json(newGateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Id format!" });
  }
  try {
    const gateway = await Gateway.findById(req.params.id);

    if (gateway == null) {
      return res.status(404).json({ message: "Gateway not found!" });
    } else {
      let uid = req.body.uid;
      let name = req.body.name;
      let ipv4 = req.body.ipv4;
      gateway.uid = uid;
      gateway.name = name;
      gateway.ipv4 = ipv4;
      const modifiedGateway = await gateway.save();
      if (modifiedGateway) {
        return res.status(200).json({ message: modifiedGateway });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a gateway ( And all it's associated peripherals) by id.
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Id format!" });
  }

  const gateway = await Gateway.findById(req.params.id);

  if (gateway) {
    try {
      //Delete all peripherals associated with the gateway(if any).
      await Peripheral.deleteMany({ gateway: req.params.id });

      //Delete Gateway
      await gateway.delete();
      return res
        .status(200)
        .json({ message: "Gateway deleted!", data: gateway });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "Gateway not found!" });
  }
});

function ValidIP(ipaddress) {
  if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ipaddress)) {
    return true;
  }
  return false;
}

export default router;
