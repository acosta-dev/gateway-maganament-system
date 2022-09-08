import express from "express";
import Peripheral from "../models/peripheral.model.js";
import Gateway from "../models/gateway.model.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const peripherals = await Peripheral.find();
    res.status(200).json(peripherals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get Peripheral by Id
router.get("/:id", async (req, res) => {
  try {
    const peripheral = await Peripheral.findById(req.params.id).populate(
      "gateway"
    );
    if (peripheral) {
      return res.json(peripheral);
    } else {
      return res.status(404).json({ messsage: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ messsage: error });
  }
});

//Create new peripheral
router.post("/", async (req, res) => {
  //Check if Gateway exists.
  if (!mongoose.Types.ObjectId.isValid(req.body.gateway)) {
    return res.status(400).json({ message: "Invalid Gateway Id format!" });
  }
  const gateway = await Gateway.findById(req.body.gateway);
  if (!gateway) return res.status(404).json({ message: "Gateway not found" });

  //Check if not reached max peripherals (10)
  const peripherals = await Peripheral.find({ gateway: req.body.gateway });
  if (peripherals.length == 10)
    return res
      .status(400)
      .json({ message: "Gateways cannot have more than 10 peripherals!" });

  const peripheral = new Peripheral({
    uid: req.body.uid,
    vendor: req.body.vendor,
    created_date: req.body.created_date,
    status: req.body.status,
    gateway: req.body.gateway,
  });
  

  try {
    const newPeripheral = await peripheral.save();
    res.status(201).json(newPeripheral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Id format!" });
  }
  const peripheral = await Peripheral.findById(req.params.id);
  if (peripheral) {
    try {
      peripheral.uid = req.body.uid;
      peripheral.vendor = req.body.vendor;
      peripheral.status = req.body.status;
      if (req.body.gateway != peripheral.gateway) {
        if (!mongoose.Types.ObjectId.isValid(req.body.gateway))
          return res
            .status(400)
            .json({ message: "Invalid Gateway Id format!" });
        const gateway = await Gateway.findById(req.body.gateway);
        if (gateway) {
          peripheral.gateway = req.body.gateway;
        } else return res.status(404).json({ message: "Gateway not found!" });
      }
      await peripheral.save();
      res.status(200).json( peripheral );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "Peripheral not found!" });
  }
});

router.delete("/:id", async (req, res) => {
  const peripheral = await Peripheral.findById(req.params.id);
  peripheral.delete();
  res
    .status(200)
    .json({ message: "Peripheral deleted", peripheral: peripheral });
});

export default router;
