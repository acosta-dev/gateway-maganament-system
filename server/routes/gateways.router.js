import express from 'express';
import Gateway from '../models/gateway.model.js'
import Peripheral from '../models/peripheral.model';

const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const gateways = await Gateway.find();
        res.status(200).json(gateways);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.get('/:id', async (req,res)=>{
    try {
        const gateway = await Gateway.findById(req.params.id);
        if (gateway) {
          const peripheral = await Peripheral.find({ gateway: req.params.id });
          console.log(gateway)
          return res
            .status(200)
            .json({gateway,peripheral});
        } else {
          return res.status(404).json({ messsage: "Not Found" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


export default router;