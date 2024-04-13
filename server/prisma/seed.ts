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
    console.log(`Created Patient: ${patient.Name}`);
  }

  // Generate 10 VitalSigns records for each patient
  const patients = await prisma.patient.findMany();
  for (const patient of patients) {
    for (let i = 1; i <= 10; i++) {
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

  // Generate 10 ADPIE records for each patient
  for (const patient of patients) {
    for (let i = 1; i <= 10; i++) {
      await prisma.aDPIE.create({
        data: {
          Diagnosis: `Diagnosis ${i}`,
          Planning: `Planning ${i}`,
          InterventionImplementation: `Intervention ${i}`,
          Evaluation: `Evaluation ${i}`,
          PatientID: patient.ProfileID,
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
