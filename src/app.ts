import { config } from "dotenv";
config();
import express from "express";
import camperRouter from "./routes/camper";
import "./configs/db";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import notFoundMiddleware from "./middlewares/notFound";
import path from "path";
import ownerInfoRouter from "./routes/ownerInfo";

const app = express();

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

const { PORT = 4000 } = process.env;

app.use("/api/campers", camperRouter);
app.use("/api/ownerInfo", ownerInfoRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
