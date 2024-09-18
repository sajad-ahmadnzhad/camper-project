import { config } from "dotenv";
config();
import express from "express";
import camperRouter from "./routes/camper";
import "./configs/db";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import notFoundMiddleware from "./middlewares/notFound";
import path from "path";
import ownerInfoRouter from "./routes/ownerInfo";
import viewsRouter from "./routes/views";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/website/main.ejs");
app.set("views", path.join(__dirname, "views"));

const { PORT = 4000 } = process.env;

app.use("/", viewsRouter);
app.use("/api/campers", camperRouter);
app.use("/api/ownerInfo", ownerInfoRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
