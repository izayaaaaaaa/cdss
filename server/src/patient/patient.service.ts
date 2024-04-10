import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePatientDto) {
    console.log('service dto: ', dto);

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

  findAll() {
    return this.prisma.patient.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patient`;
  // }

  async update(id: number, dto: UpdatePatientDto) {
    console.log('id: ', id);
    console.log('service dto: ', dto);

    // convert age string to number
    const convertedAge = parseInt(dto.Age);

    return await this.prisma.patient.update({
      where: { ProfileID: id },
      data: {
        ...dto,
        Age: convertedAge,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({
      where: { ProfileID: id },
    });
  }
}
