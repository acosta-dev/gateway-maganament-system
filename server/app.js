import express  from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const port=process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res)=>{
    res.send("Hello World")
});

app.listen(port);
console.log(`Server running on port: ${port}`);