/*
  Warnings:

  - A unique constraint covering the columns `[rg]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `employee_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `employee_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[localization]` on the table `vacancy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_rg_key" ON "customer"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "employee_users_rg_key" ON "employee_users"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "employee_users_email_key" ON "employee_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vacancy_localization_key" ON "vacancy"("localization");
