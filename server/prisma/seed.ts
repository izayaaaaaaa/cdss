import { PrismaClient, DocumentType } from '@prisma/client';

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

  // Generate 5 vital signs for each patient
  for (const patient of patients) {
    for (let i = 1; i <= 5; i++) {
      await prisma.vitalSigns.create({
        data: {
          PatientID: patient.ProfileID,
          DateTime: new Date(), // Example date, adjust as needed
          Temperature: 36.5 + i * 0.1, // Example temperature, adjust as needed
          BloodPressure: `${120 + i} / ${80 + i}`, // Example blood pressure, adjust as needed
          PulseRate: 70 + i, // Example pulse rate, adjust as needed
          OxygenSaturation: 98 + i, // Example oxygen saturation, adjust as needed
          PainScale: 5, // Example pain scale, adjust as needed
        },
      });
    }
  }

  // Generate 5 ADPIE records for each patient
  for (const patient of patients) {
    for (let i = 1; i <= 5; i++) {
      // Determine the DocumentType based on the iteration
      let documentType: DocumentType;
      switch (i % 5) {
        case 1:
          documentType = DocumentType.Assessment;
          break;
        case 2:
          documentType = DocumentType.Diagnosis;
          break;
        case 3:
          documentType = DocumentType.Planning;
          break;
        case 4:
          documentType = DocumentType.InterventionImplementation;
          break;
        default:
          documentType = DocumentType.Evaluation;
      }

      await prisma.aDPIE.create({
        data: {
          DocumentType: documentType,
          PatientID: patient.ProfileID,
          Content: `https://www.google.com/`, // Example content
        },
      });
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
