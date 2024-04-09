import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateNurseDto } from './dto/create-nurse.dto';
// import { UpdateNurseDto } from './dto/update-nurse.dto';

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

  // update(id: number, updateNurseDto: UpdateNurseDto) {
  //   return `This action updates a #${id} nurse`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} nurse`;
  // }
}
