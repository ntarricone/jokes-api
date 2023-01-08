import { Request, Router } from "express";
import db from "../db";

const jokesRouter = Router();

jokesRouter.get("/", async (_req: Request, res) => {
  const jokes = await db.joke.findMany();

  return res.status(200).json(jokes);
});

jokesRouter.get("/:id", async (req: Request, res) => {
  const joke = await db.joke.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!joke) return res.sendStatus(404);

  return res.status(200).send(joke);
});

export { jokesRouter };
