/*
  Warnings:

  - You are about to drop the column `carId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehiclePlate` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_carId_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "carId",
ADD COLUMN     "customerId" UUID NOT NULL,
ADD COLUMN     "vehiclePlate" TEXT NOT NULL;

-- DropTable
DROP TABLE "cars";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "employee_users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "employee_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
