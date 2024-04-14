/*
  Warnings:

  - You are about to drop the `diagnostic_tests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imaging_studies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratory_tests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `physical_examinations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `DiagnosticTests` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImagingStudies` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LaboratoryTests` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhysicalExaminations` to the `assessments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "diagnostic_tests" DROP CONSTRAINT "diagnostic_tests_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "imaging_studies" DROP CONSTRAINT "imaging_studies_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "laboratory_tests" DROP CONSTRAINT "laboratory_tests_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "physical_examinations" DROP CONSTRAINT "physical_examinations_ADPIEID_fkey";

-- AlterTable
ALTER TABLE "assessments" ADD COLUMN     "DiagnosticTests" JSONB NOT NULL,
ADD COLUMN     "ImagingStudies" JSONB NOT NULL,
ADD COLUMN     "LaboratoryTests" JSONB NOT NULL,
ADD COLUMN     "PhysicalExaminations" JSONB NOT NULL;

-- DropTable
DROP TABLE "diagnostic_tests";

-- DropTable
DROP TABLE "imaging_studies";

-- DropTable
DROP TABLE "laboratory_tests";

-- DropTable
DROP TABLE "physical_examinations";
