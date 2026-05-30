/*
  Warnings:

  - Added the required column `updatedAt` to the `Attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponEnabled` to the `Webinar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockChat` to the `Webinar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Webinar" ADD COLUMN     "aiAgentId" TEXT,
ADD COLUMN     "couponCode" TEXT,
ADD COLUMN     "couponEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "lockChat" BOOLEAN NOT NULL,
ADD COLUMN     "priceId" TEXT;
