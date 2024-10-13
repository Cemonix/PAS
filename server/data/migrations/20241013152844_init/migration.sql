-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "guid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "guid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "specializationId" TEXT NOT NULL,
    "userGuid" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "Patient" (
    "guid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "addressId" TEXT NOT NULL,
    "userGuid" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "Address" (
    "guid" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "Specialization" (
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_contactEmail_key" ON "Doctor"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userGuid_key" ON "Doctor"("userGuid");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userGuid_key" ON "Patient"("userGuid");

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_key" ON "Specialization"("name");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userGuid_fkey" FOREIGN KEY ("userGuid") REFERENCES "User"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userGuid_fkey" FOREIGN KEY ("userGuid") REFERENCES "User"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
