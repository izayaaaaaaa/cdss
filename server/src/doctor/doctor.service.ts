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

  getDoctorId(Name: string) {
    console.log('getDoctorId service name: ', Name);
    const doctor_id = this.prisma.doctor.findUnique({
      where: { Name },
      select: {
        ProfileID: true,
      },
    });
    console.log('service getDoctorId doctor_id: ', doctor_id);
    return doctor_id;
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
    return this.prisma.doctor.findMany({
      where: {
        Availability: true,
      },
    });
  }
}
