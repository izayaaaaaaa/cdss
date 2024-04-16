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
        // OutpatientAdmissionStatus: dto.OutpatientAdmissionStatus,
        Date_Admitted: convertedDate,
        // AssignedRoomNumber: dto.AssignedRoomNumber,
        // BedNumber: dto.BedNumber,
        // PhysicianInCharge: 1,
        // NurseProfileID: 1,
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
    return this.prisma.patient.delete({
      where: { ProfileID: id },
    });
  }
}
