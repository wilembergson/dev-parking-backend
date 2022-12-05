-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancy" (
    "id" TEXT NOT NULL,
    "localization" TEXT NOT NULL,

    CONSTRAINT "vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduleing" (
    "id" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3),
    "vacancyId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "scheduleing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_id_key" ON "cars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_plate_key" ON "cars"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "vacancy_id_key" ON "vacancy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vacancy_localization_key" ON "vacancy"("localization");

-- CreateIndex
CREATE UNIQUE INDEX "scheduleing_id_key" ON "scheduleing"("id");

-- AddForeignKey
ALTER TABLE "scheduleing" ADD CONSTRAINT "scheduleing_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduleing" ADD CONSTRAINT "scheduleing_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
