/*
  Warnings:

  - You are about to drop the `ADPIE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assessment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiagnosticTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagingStudy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaboratoryTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nurse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhysicalExamination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VitalSigns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ADPIE" DROP CONSTRAINT "ADPIE_PatientID_fkey";

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "DiagnosticTest" DROP CONSTRAINT "DiagnosticTest_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_UserID_fkey";

-- DropForeignKey
ALTER TABLE "ImagingStudy" DROP CONSTRAINT "ImagingStudy_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "LaboratoryTest" DROP CONSTRAINT "LaboratoryTest_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "Nurse" DROP CONSTRAINT "Nurse_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_NurseProfileID_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_PhysicianInCharge_fkey";

-- DropForeignKey
ALTER TABLE "PhysicalExamination" DROP CONSTRAINT "PhysicalExamination_ADPIEID_fkey";

-- DropForeignKey
ALTER TABLE "VitalSigns" DROP CONSTRAINT "VitalSigns_PatientID_fkey";

-- DropTable
DROP TABLE "ADPIE";

-- DropTable
DROP TABLE "Assessment";

-- DropTable
DROP TABLE "DiagnosticTest";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "ImagingStudy";

-- DropTable
DROP TABLE "LaboratoryTest";

-- DropTable
DROP TABLE "Nurse";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "PhysicalExamination";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VitalSigns";

-- CreateTable
CREATE TABLE "users" (
    "UserID" INTEGER NOT NULL,
    "LicenseNo" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "UserType" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "doctors" (
    "ProfileID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "Age" INTEGER NOT NULL,
    "Gender" TEXT NOT NULL,
    "Religion" TEXT NOT NULL,
    "Nationality" TEXT NOT NULL,
    "Occupation" TEXT NOT NULL,
    "MaritalStatus" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "EmailAddress" TEXT NOT NULL,
    "HomeAddress" TEXT NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "nurses" (
    "ProfileID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "Age" INTEGER NOT NULL,
    "Gender" TEXT NOT NULL,
    "Religion" TEXT NOT NULL,
    "Nationality" TEXT NOT NULL,
    "Occupation" TEXT NOT NULL,
    "MaritalStatus" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "EmailAddress" TEXT NOT NULL,
    "HomeAddress" TEXT NOT NULL,

    CONSTRAINT "nurses_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "patients" (
    "ProfileID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "Age" INTEGER NOT NULL,
    "Gender" TEXT NOT NULL,
    "Religion" TEXT NOT NULL,
    "Nationality" TEXT NOT NULL,
    "Occupation" TEXT NOT NULL,
    "MaritalStatus" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "EmailAddress" TEXT NOT NULL,
    "HomeAddress" TEXT NOT NULL,
    "ChiefComplaint" TEXT NOT NULL,
    "MedicalHistory" TEXT NOT NULL,
    "OutpatientAdmissionStatus" BOOLEAN NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "AssignedRoomNumber" INTEGER NOT NULL,
    "BedNumber" INTEGER NOT NULL,
    "PhysicianInCharge" INTEGER NOT NULL,
    "NurseNotes" TEXT NOT NULL,
    "FlowChart" TEXT NOT NULL,
    "NurseProfileID" INTEGER NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "vital_signs" (
    "VitalSignID" INTEGER NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL,
    "Temperature" DOUBLE PRECISION NOT NULL,
    "BloodPressure" TEXT NOT NULL,
    "PulseRate" INTEGER NOT NULL,
    "OxygenSaturation" INTEGER NOT NULL,
    "PainScale" INTEGER NOT NULL,

    CONSTRAINT "vital_signs_pkey" PRIMARY KEY ("VitalSignID")
);

-- CreateTable
CREATE TABLE "adpie" (
    "ADPIEID" INTEGER NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "Diagnosis" TEXT NOT NULL,
    "Planning" TEXT NOT NULL,
    "InterventionImplementation" TEXT NOT NULL,
    "Evaluation" TEXT NOT NULL,

    CONSTRAINT "adpie_pkey" PRIMARY KEY ("ADPIEID")
);

-- CreateTable
CREATE TABLE "assessments" (
    "ADPIEID" INTEGER NOT NULL,
    "HealthHistory" TEXT NOT NULL,
    "ChiefComplaint" TEXT NOT NULL,
    "HistoryOfPresentIllness" TEXT NOT NULL,
    "PastMedicalHistory" TEXT NOT NULL,
    "SocialHistory" TEXT NOT NULL,
    "NurseNotes" TEXT NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("ADPIEID")
);

-- CreateTable
CREATE TABLE "laboratory_tests" (
    "TestID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "TestName" TEXT NOT NULL,
    "TestResult" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "laboratory_tests_pkey" PRIMARY KEY ("TestID")
);

-- CreateTable
CREATE TABLE "physical_examinations" (
    "ExaminationID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "ExaminationName" TEXT NOT NULL,
    "Findings" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "physical_examinations_pkey" PRIMARY KEY ("ExaminationID")
);

-- CreateTable
CREATE TABLE "diagnostic_tests" (
    "DiagnosticTestID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "TestName" TEXT NOT NULL,
    "TestResult" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "diagnostic_tests_pkey" PRIMARY KEY ("DiagnosticTestID")
);

-- CreateTable
CREATE TABLE "imaging_studies" (
    "ImagingStudyID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "StudyName" TEXT NOT NULL,
    "Findings" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "imaging_studies_pkey" PRIMARY KEY ("ImagingStudyID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_LicenseNo_key" ON "users"("LicenseNo");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_UserID_key" ON "doctors"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "nurses_UserID_key" ON "nurses"("UserID");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurses" ADD CONSTRAINT "nurses_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_PhysicianInCharge_fkey" FOREIGN KEY ("PhysicianInCharge") REFERENCES "doctors"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_NurseProfileID_fkey" FOREIGN KEY ("NurseProfileID") REFERENCES "nurses"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vital_signs" ADD CONSTRAINT "vital_signs_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "patients"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adpie" ADD CONSTRAINT "adpie_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "patients"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "adpie"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_tests" ADD CONSTRAINT "laboratory_tests_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "assessments"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_examinations" ADD CONSTRAINT "physical_examinations_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "assessments"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_tests" ADD CONSTRAINT "diagnostic_tests_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "assessments"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imaging_studies" ADD CONSTRAINT "imaging_studies_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "assessments"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;
