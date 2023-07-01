/*
  Warnings:

  - Added the required column `type` to the `vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancy" ADD COLUMN     "type" TEXT NOT NULL;
