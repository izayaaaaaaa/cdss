-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_NurseProfileID_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_PhysicianInCharge_fkey";

-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "OutpatientAdmissionStatus" DROP NOT NULL,
ALTER COLUMN "AssignedRoomNumber" DROP NOT NULL,
ALTER COLUMN "BedNumber" DROP NOT NULL,
ALTER COLUMN "PhysicianInCharge" DROP NOT NULL,
ALTER COLUMN "NurseProfileID" DROP NOT NULL,
ALTER COLUMN "Date_Admitted" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_PhysicianInCharge_fkey" FOREIGN KEY ("PhysicianInCharge") REFERENCES "doctors"("ProfileID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_NurseProfileID_fkey" FOREIGN KEY ("NurseProfileID") REFERENCES "nurses"("ProfileID") ON DELETE SET NULL ON UPDATE CASCADE;
