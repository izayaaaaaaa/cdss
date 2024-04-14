import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Generate 10 doctors with associated user accounts
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        LicenseNo: `LicenseNo${i}`,
        Password: `Password${i}`,
        UserType: 'Doctor',
      },
    });

    await prisma.doctor.create({
      data: {
        UserID: user.UserID,
        Name: `Doctor${i}`,
        Age: 30 + i,
        Gender: 'Male',
        PhoneNumber: `123456789${i}`,
        EmailAddress: `doctor${i}@example.com`,
        Availability: true,
      },
    });

    console.log(`Created Doctor: Doctor${i}`);
  }

  // Generate 10 nurses with associated user accounts
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        LicenseNo: `LicenseNo${i + 10}`,
        Password: `Password${i + 10}`,
        UserType: 'Nurse',
      },
    });

    await prisma.nurse.create({
      data: {
        UserID: user.UserID,
        Name: `Nurse${i}`,
        Age: 25 + i,
        Gender: 'Female',
        PhoneNumber: `987654321${i}`,
        EmailAddress: `nurse${i}@example.com`,
        Availability: true,
      },
    });

    console.log(`Created Nurse: Nurse${i}`);
  }

  // Generate 10 sample patients
  const patients = [];
  for (let i = 1; i <= 10; i++) {
    const patient = await prisma.patient.create({
      data: {
        Name: `Patient${i}`,
        Age: 20 + i,
        Gender: 'Male',
        PhoneNumber: `1122334455${i}`,
        EmailAddress: `patient${i}@example.com`,
        ChiefComplaint: 'Headache',
        MedicalHistory: 'No significant history',
        OutpatientAdmissionStatus: false,
        Date_Admitted: new Date(),
        AssignedRoomNumber: 100 + i,
        BedNumber: 10 + i,
        PhysicianInCharge: 1, // Assuming the first doctor is the physician in charge
        NurseNotes: 'Patient is in good condition',
        FlowChart: 'Initial assessment',
        NurseProfileID: 1, // Assuming the first nurse is in charge
      },
    });
    patients.push(patient);
    console.log(`Created Patient: ${patient.Name}`);
  }

  // Generate 5 VitalSigns records for each patient
  for (const patient of patients) {
    for (let i = 1; i <= 5; i++) {
      await prisma.vitalSigns.create({
        data: {
          DateTime: new Date(),
          Temperature: 36.5 + i * 0.1, // Example temperature values
          BloodPressure: `${120 + i}-${80 + i}`, // Example blood pressure values
          PulseRate: 70 + i,
          OxygenSaturation: 98 - i,
          PainScale: i % 10,
          PatientID: patient.ProfileID,
        },
      });
    }
  }

  // Generate 5 ADPIE records for each patient
  for (const patient of patients) {
    for (let i = 1; i <= 5; i++) {
      const adpie = await prisma.aDPIE.create({
        data: {
          Diagnosis: `Diagnosis ${i}`,
          Planning: `Planning ${i}`,
          InterventionImplementation: `Intervention ${i}`,
          Evaluation: `Evaluation ${i}`,
          PatientID: patient.ProfileID,
        },
      });

      // Generate 2 Assessments for each ADPIE record
      for (let j = 1; j <= 2; j++) {
        await prisma.assessment.create({
          data: {
            HealthHistory: 'No significant history',
            ChiefComplaint: 'Headache',
            HistoryOfPresentIllness: 'Started 2 days ago',
            PastMedicalHistory: 'No significant history',
            SocialHistory: 'Non-smoker, no alcohol consumption',
            NurseNotes: 'Patient is in good condition',
            ADPIEID: adpie.ADPIEID,
            LaboratoryTests: [
              {
                label: 'Blood Test',
                value: `https://drive.google.com/file/d/${i}${j}`,
              },
            ],
            PhysicalExaminations: [
              {
                label: 'General Examination',
                value: `https://drive.google.com/file/d/${i}${j}`,
              },
            ],
            DiagnosticTests: [
              {
                label: 'MRI Scan',
                value: `https://drive.google.com/file/d/${i}${j}`,
              },
            ],
            ImagingStudies: [
              {
                label: 'X-Ray',
                value: `https://drive.google.com/file/d/${i}${j}`,
              },
            ],
          },
        });
      }
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
