import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/cors";

const app: Express = express();

dotenv.config();

app.use(express.json());

app.use(cors(corsOptions));

app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

export default app;