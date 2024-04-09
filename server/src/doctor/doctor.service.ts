import { Injectable } from '@nestjs/common';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findOne(ProfileID: number) {
    return this.prisma.doctor.findUnique({
      where: { ProfileID },
      select: {
        Name: true,
      },
    });
  }

  // update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }
}
