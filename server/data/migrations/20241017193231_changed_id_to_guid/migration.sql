/*
  Warnings:

  - You are about to drop the column `specializationId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `specializationGuid` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressGuid` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_addressId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specializationId",
ADD COLUMN     "specializationGuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "addressId",
ADD COLUMN     "addressGuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specializationGuid_fkey" FOREIGN KEY ("specializationGuid") REFERENCES "Specialization"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_addressGuid_fkey" FOREIGN KEY ("addressGuid") REFERENCES "Address"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
