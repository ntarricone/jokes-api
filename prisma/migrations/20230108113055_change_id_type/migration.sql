-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "punchline" TEXT NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);
