import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdpieDto, UpdateAdpieDto } from './dto';

@Injectable()
export class AdpieService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdpieDto) {
    const { PatientID, ...rest } = dto; // Destructure PatientID and the rest of the properties
    return this.prisma.aDPIE.create({
      data: {
        ...rest, // Spread the rest of the properties
        Patient: {
          connect: {
            ProfileID: PatientID, // Use PatientID here
          },
        },
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
    console.log('update adpie service');
    console.log('update adpie service id: ', id);
    console.log('update adpie service dto: ', dto);
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
