import { Injectable } from '@nestjs/common';
// import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}
  // create(createPatientDto: CreatePatientDto) {
  //   return 'This action adds a new patient';
  // }

  findAll() {
    return this.prisma.patient.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} patient`;
  // }

  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} patient`;
  // }
}
