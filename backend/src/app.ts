import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "../config/cors";
import gameRoutes from "../src/api/v1/routes/gameRoutes";

const app: Express = express();

dotenv.config();

app.use(express.json());

app.use(cors(corsOptions));

app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

app.use("/api/v1/games", gameRoutes);

export default app;