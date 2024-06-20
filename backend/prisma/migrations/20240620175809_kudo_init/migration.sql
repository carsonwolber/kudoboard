-- CreateTable
CREATE TABLE "Kudos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "Author" TEXT NOT NULL,

    CONSTRAINT "Kudos_pkey" PRIMARY KEY ("id")
);
