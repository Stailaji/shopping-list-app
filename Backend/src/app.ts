import express from "express";
import cors from "cors";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(errorHandler);
app.use(cors());
app.use(express.json());
app.use("/api", router);

export default app;
