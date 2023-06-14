/*
  Warnings:

  - Added the required column `occupied` to the `vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancy" ADD COLUMN     "occupied" BOOLEAN NOT NULL;
