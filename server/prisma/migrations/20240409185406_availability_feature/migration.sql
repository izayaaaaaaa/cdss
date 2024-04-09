-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "Availability" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "nurses" ADD COLUMN     "Availability" BOOLEAN NOT NULL DEFAULT true;
