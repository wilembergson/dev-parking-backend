/*
  Warnings:

  - Added the required column `employeeUserId` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "employeeUserId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_employeeUserId_fkey" FOREIGN KEY ("employeeUserId") REFERENCES "employee_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
