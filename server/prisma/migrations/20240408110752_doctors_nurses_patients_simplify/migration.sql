/*
  Warnings:

  - You are about to drop the column `Birthday` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `HomeAddress` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `MaritalStatus` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `Nationality` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `Occupation` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `Religion` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `Birthday` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `HomeAddress` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `MaritalStatus` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `Nationality` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `Occupation` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `Religion` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `Birthday` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `HomeAddress` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `MaritalStatus` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `Nationality` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `Religion` on the `patients` table. All the data in the column will be lost.
  - Added the required column `Date_Admitted` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "Birthday",
DROP COLUMN "HomeAddress",
DROP COLUMN "MaritalStatus",
DROP COLUMN "Nationality",
DROP COLUMN "Occupation",
DROP COLUMN "Religion";

-- AlterTable
ALTER TABLE "nurses" DROP COLUMN "Birthday",
DROP COLUMN "HomeAddress",
DROP COLUMN "MaritalStatus",
DROP COLUMN "Nationality",
DROP COLUMN "Occupation",
DROP COLUMN "Religion";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "Birthday",
DROP COLUMN "Date",
DROP COLUMN "HomeAddress",
DROP COLUMN "MaritalStatus",
DROP COLUMN "Nationality",
DROP COLUMN "Religion",
ADD COLUMN     "Date_Admitted" TIMESTAMP(3) NOT NULL;
