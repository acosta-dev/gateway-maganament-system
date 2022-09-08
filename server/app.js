import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import gatewayRouter from "./routes/gateways.router.js";
import peripheralRouter from "./routes/peripheral.router.js";

// Get Env values
dotenv.config();
// if on test enviroment use a test database
const DB_URL = process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL

//DB Connection
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("Error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database!!!"));

const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/gateways", gatewayRouter);
app.use("/peripherals", peripheralRouter);

export default app


