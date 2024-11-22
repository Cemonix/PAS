/*
  Warnings:

  - You are about to drop the column `addressGuid` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_addressGuid_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "addressGuid",
DROP COLUMN "birthdate",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
