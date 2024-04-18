/*
  Warnings:

  - You are about to drop the column `Diagnosis` on the `adpie` table. All the data in the column will be lost.
  - You are about to drop the column `Evaluation` on the `adpie` table. All the data in the column will be lost.
  - You are about to drop the column `InterventionImplementation` on the `adpie` table. All the data in the column will be lost.
  - You are about to drop the column `Planning` on the `adpie` table. All the data in the column will be lost.
  - You are about to drop the `assessments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Content` to the `adpie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DateModified` to the `adpie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DocumentType` to the `adpie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('Assessment', 'Diagnosis', 'Planning', 'InterventionImplementation', 'Evaluation');

-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_ADPIEID_fkey";

-- AlterTable
ALTER TABLE "adpie" DROP COLUMN "Diagnosis",
DROP COLUMN "Evaluation",
DROP COLUMN "InterventionImplementation",
DROP COLUMN "Planning",
ADD COLUMN     "Content" TEXT NOT NULL,
ADD COLUMN     "DateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "DateModified" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "DocumentType" "DocumentType" NOT NULL;

-- DropTable
DROP TABLE "assessments";
