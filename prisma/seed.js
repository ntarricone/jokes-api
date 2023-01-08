const _jokes = require("../src/seed/jokes.json");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JOKES_GIT_API_SEED =
  "https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json";

const seedJokes = async () => {
  try {
    const dbJokes = await prisma.joke.findMany();
    if (dbJokes.length) return console.log("Jokes already seeded");

    const response = await fetch(JOKES_GIT_API_SEED);
    const jokes = await response.json();
    await prisma.joke.createMany({
      data: jokes,
      skipDuplicates: true,
    });
    console.log("jokes created from git repo");
  } catch (e) {
    console.error("Error seeding jokes from github api", e);
    try {
      //try to create from local file
      await prisma.joke.createMany({
        data: _jokes,
        skipDuplicates: true,
      });
      console.log("jokes created from local json");
    } catch (error) {
      await prisma.$disconnect();
      console.error("Error seeding jokes from local json", e);
      process.exit(1);
    }
  }
};

const load = async () => {
  await prisma.$connect();

  await seedJokes();

  await prisma.$disconnect();
  process.exit(0);
};

load();
