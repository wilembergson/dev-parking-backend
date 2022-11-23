-- CreateTable
CREATE TABLE "parking" (
    "id" TEXT NOT NULL,
    "localization" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL,

    CONSTRAINT "parking_pkey" PRIMARY KEY ("id")
);
