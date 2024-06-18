import express from "express";
import Database from "./functions/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hi there!! Welcome to my mer authentication.");
});

app.get("*", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  Database();
});
