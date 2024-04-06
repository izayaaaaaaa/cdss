-- AlterTable
CREATE SEQUENCE adpie_adpieid_seq;
ALTER TABLE "adpie" ALTER COLUMN "ADPIEID" SET DEFAULT nextval('adpie_adpieid_seq');
ALTER SEQUENCE adpie_adpieid_seq OWNED BY "adpie"."ADPIEID";

-- AlterTable
CREATE SEQUENCE assessments_adpieid_seq;
ALTER TABLE "assessments" ALTER COLUMN "ADPIEID" SET DEFAULT nextval('assessments_adpieid_seq');
ALTER SEQUENCE assessments_adpieid_seq OWNED BY "assessments"."ADPIEID";

-- AlterTable
CREATE SEQUENCE diagnostic_tests_diagnostictestid_seq;
ALTER TABLE "diagnostic_tests" ALTER COLUMN "DiagnosticTestID" SET DEFAULT nextval('diagnostic_tests_diagnostictestid_seq');
ALTER SEQUENCE diagnostic_tests_diagnostictestid_seq OWNED BY "diagnostic_tests"."DiagnosticTestID";

-- AlterTable
CREATE SEQUENCE doctors_profileid_seq;
ALTER TABLE "doctors" ALTER COLUMN "ProfileID" SET DEFAULT nextval('doctors_profileid_seq');
ALTER SEQUENCE doctors_profileid_seq OWNED BY "doctors"."ProfileID";

-- AlterTable
CREATE SEQUENCE imaging_studies_imagingstudyid_seq;
ALTER TABLE "imaging_studies" ALTER COLUMN "ImagingStudyID" SET DEFAULT nextval('imaging_studies_imagingstudyid_seq');
ALTER SEQUENCE imaging_studies_imagingstudyid_seq OWNED BY "imaging_studies"."ImagingStudyID";

-- AlterTable
CREATE SEQUENCE laboratory_tests_testid_seq;
ALTER TABLE "laboratory_tests" ALTER COLUMN "TestID" SET DEFAULT nextval('laboratory_tests_testid_seq');
ALTER SEQUENCE laboratory_tests_testid_seq OWNED BY "laboratory_tests"."TestID";

-- AlterTable
CREATE SEQUENCE nurses_profileid_seq;
ALTER TABLE "nurses" ALTER COLUMN "ProfileID" SET DEFAULT nextval('nurses_profileid_seq');
ALTER SEQUENCE nurses_profileid_seq OWNED BY "nurses"."ProfileID";

-- AlterTable
CREATE SEQUENCE patients_profileid_seq;
ALTER TABLE "patients" ALTER COLUMN "ProfileID" SET DEFAULT nextval('patients_profileid_seq');
ALTER SEQUENCE patients_profileid_seq OWNED BY "patients"."ProfileID";

-- AlterTable
CREATE SEQUENCE physical_examinations_examinationid_seq;
ALTER TABLE "physical_examinations" ALTER COLUMN "ExaminationID" SET DEFAULT nextval('physical_examinations_examinationid_seq');
ALTER SEQUENCE physical_examinations_examinationid_seq OWNED BY "physical_examinations"."ExaminationID";

-- AlterTable
CREATE SEQUENCE users_userid_seq;
ALTER TABLE "users" ALTER COLUMN "UserID" SET DEFAULT nextval('users_userid_seq');
ALTER SEQUENCE users_userid_seq OWNED BY "users"."UserID";

-- AlterTable
CREATE SEQUENCE vital_signs_vitalsignid_seq;
ALTER TABLE "vital_signs" ALTER COLUMN "VitalSignID" SET DEFAULT nextval('vital_signs_vitalsignid_seq');
ALTER SEQUENCE vital_signs_vitalsignid_seq OWNED BY "vital_signs"."VitalSignID";
