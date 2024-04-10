import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNurseDto } from './dto';

@Injectable()
export class NurseService {
  constructor(private prisma: PrismaService) {}
  // create(createNurseDto: CreateNurseDto) {
  //   return 'This action adds a new nurse';
  // }

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
    console.log('id: ', id);
    console.log('service dto: ', dto);

    return await this.prisma.doctor.update({
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

  // remove(id: number) {
  //   return `This action removes a #${id} nurse`;
  // }
}
