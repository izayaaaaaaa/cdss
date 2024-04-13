import { Injectable } from '@nestjs/common';
import { CreateVitalSignsDto, UpdateVitalSignsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VitalsignsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVitalSignsDto, patientId: number) {
    return this.prisma.vitalSigns.create({
      data: {
        ...dto,
        PatientID: patientId,
      },
    });
  }

  async findAll() {
    return this.prisma.vitalSigns.findMany({
      include: {
        Patient: true, // Include patient details in the response
      },
    });
  }

  // async findOne(id: number) {
  //   return this.prisma.vitalSigns.findUnique({
  //     where: { VitalSignID: id },
  //     include: {
  //       Patient: true, // Include patient details in the response
  //     },
  //   });
  // }

  async update(id: number, dto: UpdateVitalSignsDto) {
    return this.prisma.vitalSigns.update({
      where: { VitalSignID: id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.vitalSigns.delete({
      where: { VitalSignID: id },
    });
  }
}
