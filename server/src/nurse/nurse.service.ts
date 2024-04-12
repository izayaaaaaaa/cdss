import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNurseDto } from './dto';

@Injectable()
export class NurseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.nurse.findMany();
  }

  getNurseName(id: number) {
    return this.prisma.nurse.findUnique({
      where: { ProfileID: id },
      select: {
        Name: true,
      },
    });
  }

  async update(id: number, dto: UpdateNurseDto) {
    // console.log('id: ', id);
    // console.log('service dto: ', dto);

    return await this.prisma.nurse.update({
      where: { ProfileID: id },
      data: {
        Name: dto.name,
        Age: dto.age,
        Gender: dto.gender,
        PhoneNumber: dto.phoneNumber,
        EmailAddress: dto.emailAddress,
        Availability: dto.availability,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.nurse.delete({
      where: { ProfileID: id },
    });
  }

  getAvailableNurses() {
    return this.prisma.nurse.findMany({
      where: {
        Availability: true,
      },
    });
  }
}
