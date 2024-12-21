/*
  Warnings:

  - A unique constraint covering the columns `[managedSectorId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('CREADO', 'PREPARANDO', 'PRODUCIENDO', 'RETIRAR', 'FINALIZADA');

-- CreateEnum
CREATE TYPE "Voltage" AS ENUM ('V12', 'V24');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "managedSectorId" INTEGER;

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloorType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FloorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderNumber" SERIAL NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "realDeliveryDate" TIMESTAMP(3),
    "clientId" INTEGER NOT NULL,
    "truckId" INTEGER NOT NULL,
    "totalLength" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "utilLength" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalHeight" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "utilHeight" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalWidth" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "utilWidth" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "floorThickness" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "floorTypeId" INTEGER NOT NULL,
    "sideDoor" TEXT,
    "backDoor" TEXT,
    "stairs" TEXT,
    "stakeHolders" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "nozzles" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "malacates" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "arches" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "color" TEXT NOT NULL DEFAULT 'BLANCO',
    "colorSocket" TEXT NOT NULL DEFAULT 'BLANCO',
    "colorBottom" TEXT NOT NULL DEFAULT 'BLANCO',
    "voltage" "Voltage" NOT NULL DEFAULT 'V24',
    "state" "OrderState" NOT NULL DEFAULT 'CREADO',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderNumber")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "gearbox" INTEGER NOT NULL,
    "chassisLength" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "chassisWidth" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "wheelCenter" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "room" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cuit" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "mail" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserWorksIn" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserWorksIn_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Order_clientId_idx" ON "Order"("clientId");

-- CreateIndex
CREATE INDEX "_UserWorksIn_B_index" ON "_UserWorksIn"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_managedSectorId_key" ON "User"("managedSectorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managedSectorId_fkey" FOREIGN KEY ("managedSectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_floorTypeId_fkey" FOREIGN KEY ("floorTypeId") REFERENCES "FloorType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWorksIn" ADD CONSTRAINT "_UserWorksIn_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWorksIn" ADD CONSTRAINT "_UserWorksIn_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
