/*
  Warnings:

  - You are about to drop the column `type` on the `records` table. All the data in the column will be lost.
  - Added the required column `device` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" DROP COLUMN "type",
ADD COLUMN     "device" VARCHAR(100) NOT NULL,
ADD COLUMN     "network" VARCHAR(100) NOT NULL;
