/*
  Warnings:

  - Added the required column `speed` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" ADD COLUMN     "speed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" VARCHAR(100) NOT NULL;
