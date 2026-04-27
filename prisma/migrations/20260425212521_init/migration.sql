-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(500);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "words" (
    "wordId" UUID NOT NULL,
    "text" VARCHAR(50) NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("wordId")
);

-- CreateTable
CREATE TABLE "rooms" (
    "roomId" UUID NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR(500),
    "status" VARCHAR(20) NOT NULL DEFAULT 'waiting',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "players" (
    "playerId" UUID NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "room_players" (
    "id" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "isAlive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "room_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_rounds" (
    "roundId" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "wordId" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'waiting',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_rounds_pkey" PRIMARY KEY ("roundId")
);

-- CreateTable
CREATE TABLE "votes" (
    "voteId" UUID NOT NULL,
    "roundId" UUID NOT NULL,
    "voterId" UUID NOT NULL,
    "targetId" UUID NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("voteId")
);

-- CreateTable
CREATE TABLE "messages" (
    "messageId" UUID NOT NULL,
    "roundId" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "words_text_key" ON "words"("text");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_code_key" ON "rooms"("code");

-- CreateIndex
CREATE UNIQUE INDEX "room_players_roomId_playerId_key" ON "room_players"("roomId", "playerId");

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_players" ADD CONSTRAINT "room_players_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_players" ADD CONSTRAINT "room_players_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("wordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "game_rounds"("roundId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "game_rounds"("roundId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
