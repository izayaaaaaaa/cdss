/*
  Warnings:

  - The primary key for the `assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_pkey",
ADD COLUMN     "AssessmentID" SERIAL NOT NULL,
ALTER COLUMN "ADPIEID" DROP DEFAULT,
ADD CONSTRAINT "assessments_pkey" PRIMARY KEY ("AssessmentID");
DROP SEQUENCE "assessments_adpieid_seq";
