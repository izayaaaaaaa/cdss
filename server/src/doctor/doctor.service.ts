import { Injectable } from '@nestjs/common';
import { UpdateDoctorDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.doctor.findMany();
  }

  getDoctorName(ProfileID: number) {
    return this.prisma.doctor.findUnique({
      where: { ProfileID },
      select: {
        Name: true,
      },
    });
  }

  async update(id: number, dto: UpdateDoctorDto) {
    // console.log('id: ', id);
    // console.log('service dto: ', dto);

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

  async remove(id: number) {
    return await this.prisma.doctor.delete({
      where: { ProfileID: id },
    });
  }

  getAvailableDoctors() {
    return this.prisma.doctor.count({
      where: {
        Availability: true,
      },
    });
  }
}
