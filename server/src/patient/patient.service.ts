import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePatientDto) {
    console.log('CreatePatientDto: ', dto);

    // convert age string to number
    const convertedAge = parseInt(dto.Age);

    // convert date to needed format
    const convertedDate = new Date(dto.Date_Admitted);

    return this.prisma.patient.create({
      data: {
        Name: dto.Name,
        Age: convertedAge,
        Gender: dto.Gender,
        PhoneNumber: dto.PhoneNumber,
        EmailAddress: dto.EmailAddress,
        ChiefComplaint: dto.ChiefComplaint,
        MedicalHistory: dto.MedicalHistory,
        OutpatientAdmissionStatus: false,
        Date_Admitted: convertedDate,
        AssignedRoomNumber: 0,
        BedNumber: 0,
        PhysicianInCharge: 1,
        NurseProfileID: 1,
        NurseNotes: '',
        FlowChart: '',
      },
    });
  }

  find(id: number) {
    return this.prisma.patient.findUnique({
      where: { ProfileID: id },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patient`;
  // }

  async update(patientId: number, dto: UpdatePatientDto) {
    console.log('service update id: ', patientId);
    console.log('service update dto: ', dto);

    const convertedAge = parseInt(dto.Age);
    const convertedDate = new Date(dto.Date_Admitted);
    const convertedAssignedRoomNumber = parseInt(dto.AssignedRoomNumber);
    const convertedBedNumber = parseInt(dto.BedNumber);

    await this.prisma.patient.update({
      where: { ProfileID: patientId },
      data: {
        Name: dto.Name,
        Age: convertedAge,
        Gender: dto.Gender,
        PhoneNumber: dto.PhoneNumber,
        EmailAddress: dto.EmailAddress,
        ChiefComplaint: dto.ChiefComplaint,
        MedicalHistory: dto.MedicalHistory,
        OutpatientAdmissionStatus: dto.OutpatientAdmissionStatus,
        Date_Admitted: convertedDate,
        AssignedRoomNumber: convertedAssignedRoomNumber,
        BedNumber: convertedBedNumber,
        NurseNotes: dto.NurseNotes,
        FlowChart: dto.FlowChart,
        NurseProfileID: dto.NurseProfileID,
        PhysicianInCharge: dto.PhysicianInCharge,
      },
    });

    if (dto.PhysicianInCharge) {
      await this.prisma.doctor.update({
        where: { ProfileID: dto.PhysicianInCharge },
        data: {
          Availability: false,
        },
      });
    }

    if (dto.NurseProfileID) {
      await this.prisma.nurse.update({
        where: { ProfileID: dto.NurseProfileID },
        data: {
          Availability: false,
        },
      });
    }

    return this.prisma.patient.findUnique({
      where: { ProfileID: patientId },
    });
  }

  async remove(id: number) {
    console.log('patient delete service runs w/ id: ', id);

    // First, delete all VitalSigns records associated with the patient
    await this.prisma.vitalSigns.deleteMany({
      where: { PatientID: id },
    });

    // Fetch all ADPIE records associated with the patient
    const adpies = await this.prisma.aDPIE.findMany({
      where: { PatientID: id },
    });

    // Delete all Assessment records associated with the fetched ADPIE records
    if (adpies.length > 0) {
      await this.prisma.assessment.deleteMany({
        where: { ADPIEID: { in: adpies.map((adpie) => adpie.ADPIEID) } },
      });
    }

    // Next, delete all ADPIE records associated with the patient
    await this.prisma.aDPIE.deleteMany({
      where: { PatientID: id },
    });

    // Finally, delete the patient
    return this.prisma.patient.delete({
      where: { ProfileID: id },
    });
  }
}
