import express from "express";
import dotenv from "dotenv";
import { jokesRouter } from "./routers/jokes.router";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.use('/jokes', jokesRouter)


app.get("/ping", (_req, res) => {
  console.log("Someone pinged here!!");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
