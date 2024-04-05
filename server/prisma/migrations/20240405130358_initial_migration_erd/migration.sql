-- CreateTable
CREATE TABLE "User" (
    "UserID" INTEGER NOT NULL,
    "LicenseNo" INTEGER NOT NULL,
    "Password" TEXT NOT NULL,
    "UserType" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Doctor" (
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

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "Nurse" (
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

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "Patient" (
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

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("ProfileID")
);

-- CreateTable
CREATE TABLE "VitalSigns" (
    "VitalSignID" INTEGER NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL,
    "Temperature" DOUBLE PRECISION NOT NULL,
    "BloodPressure" TEXT NOT NULL,
    "PulseRate" INTEGER NOT NULL,
    "OxygenSaturation" INTEGER NOT NULL,
    "PainScale" INTEGER NOT NULL,

    CONSTRAINT "VitalSigns_pkey" PRIMARY KEY ("VitalSignID")
);

-- CreateTable
CREATE TABLE "ADPIE" (
    "ADPIEID" INTEGER NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "Diagnosis" TEXT NOT NULL,
    "Planning" TEXT NOT NULL,
    "InterventionImplementation" TEXT NOT NULL,
    "Evaluation" TEXT NOT NULL,

    CONSTRAINT "ADPIE_pkey" PRIMARY KEY ("ADPIEID")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "ADPIEID" INTEGER NOT NULL,
    "HealthHistory" TEXT NOT NULL,
    "ChiefComplaint" TEXT NOT NULL,
    "HistoryOfPresentIllness" TEXT NOT NULL,
    "PastMedicalHistory" TEXT NOT NULL,
    "SocialHistory" TEXT NOT NULL,
    "NurseNotes" TEXT NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("ADPIEID")
);

-- CreateTable
CREATE TABLE "LaboratoryTest" (
    "TestID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "TestName" TEXT NOT NULL,
    "TestResult" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "LaboratoryTest_pkey" PRIMARY KEY ("TestID")
);

-- CreateTable
CREATE TABLE "PhysicalExamination" (
    "ExaminationID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "ExaminationName" TEXT NOT NULL,
    "Findings" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "PhysicalExamination_pkey" PRIMARY KEY ("ExaminationID")
);

-- CreateTable
CREATE TABLE "DiagnosticTest" (
    "DiagnosticTestID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "TestName" TEXT NOT NULL,
    "TestResult" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "DiagnosticTest_pkey" PRIMARY KEY ("DiagnosticTestID")
);

-- CreateTable
CREATE TABLE "ImagingStudy" (
    "ImagingStudyID" INTEGER NOT NULL,
    "ADPIEID" INTEGER NOT NULL,
    "StudyName" TEXT NOT NULL,
    "Findings" TEXT NOT NULL,
    "MediaURL" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "ImagingStudy_pkey" PRIMARY KEY ("ImagingStudyID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_UserID_key" ON "Doctor"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_UserID_key" ON "Nurse"("UserID");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nurse" ADD CONSTRAINT "Nurse_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_PhysicianInCharge_fkey" FOREIGN KEY ("PhysicianInCharge") REFERENCES "Doctor"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_NurseProfileID_fkey" FOREIGN KEY ("NurseProfileID") REFERENCES "Nurse"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalSigns" ADD CONSTRAINT "VitalSigns_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "Patient"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADPIE" ADD CONSTRAINT "ADPIE_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "Patient"("ProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "ADPIE"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryTest" ADD CONSTRAINT "LaboratoryTest_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "Assessment"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExamination" ADD CONSTRAINT "PhysicalExamination_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "Assessment"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticTest" ADD CONSTRAINT "DiagnosticTest_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "Assessment"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_ADPIEID_fkey" FOREIGN KEY ("ADPIEID") REFERENCES "Assessment"("ADPIEID") ON DELETE RESTRICT ON UPDATE CASCADE;
