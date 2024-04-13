import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdpieDto, UpdateAdpieDto } from './dto';

@Injectable()
export class AdpieService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdpieDto, patientId: number) {
    return this.prisma.aDPIE.create({
      data: {
        ...dto,
        PatientID: patientId,
      },
    });
  }

  async findAll() {
    return this.prisma.aDPIE.findMany({
      include: {
        Patient: true, // Include patient details in the response
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.aDPIE.findUnique({
      where: { ADPIEID: id },
      include: {
        Patient: true, // Include patient details in the response
      },
    });
  }

  async update(id: number, dto: UpdateAdpieDto) {
    return this.prisma.aDPIE.update({
      where: { ADPIEID: id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.aDPIE.delete({
      where: { ADPIEID: id },
    });
  }
}
