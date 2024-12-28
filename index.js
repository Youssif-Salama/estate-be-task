import express from "express";
import env from "dotenv";
import Bootstrap from "./bootstrap.js";
env.config();

const app = express();
// use to parse json
app.use(express.json());
Bootstrap(app);
