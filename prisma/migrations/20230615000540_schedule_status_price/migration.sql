/*
  Warnings:

  - Added the required column `finished` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "finished" BOOLEAN NOT NULL,
ADD COLUMN     "pricePerHour" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "priceTotal" DECIMAL(65,30);
