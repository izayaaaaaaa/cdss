import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePatientDto) {
    console.log('service dto: ', dto);

    return this.prisma.patient.create({
      data: {
        Name: dto.Name,
        Age: dto.Age,
        Gender: dto.Gender,
        PhoneNumber: dto.PhoneNumber,
        EmailAddress: dto.EmailAddress,
        ChiefComplaint: dto.ChiefComplaint,
        MedicalHistory: dto.MedicalHistory,
        OutpatientAdmissionStatus: dto.OutpatientAdmissionStatus,
        Date_Admitted: dto.Date_Admitted,
        AssignedRoomNumber: dto.AssignedRoomNumber,
        BedNumber: dto.BedNumber,
        PhysicianInCharge: 1,
        NurseProfileID: 1,
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patient`;
  // }

  async update(id: number, dto: UpdatePatientDto) {
    console.log('id: ', id);
    console.log('service dto: ', dto);

    return await this.prisma.patient.update({
      where: { ProfileID: id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({
      where: { ProfileID: id },
    });
  }
}
