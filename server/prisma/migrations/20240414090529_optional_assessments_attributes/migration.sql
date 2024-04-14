-- AlterTable
ALTER TABLE "assessments" ALTER COLUMN "DiagnosticTests" DROP NOT NULL,
ALTER COLUMN "ImagingStudies" DROP NOT NULL,
ALTER COLUMN "LaboratoryTests" DROP NOT NULL,
ALTER COLUMN "PhysicalExaminations" DROP NOT NULL;
