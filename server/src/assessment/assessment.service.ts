import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssessmentDto, UpdateAssessmentDto } from './dto';

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAssessmentDto, ADPIEID: number) {
    const newAssessment = await this.prisma.assessment.create({
      data: {
        ...dto,
        ADPIE: {
          connect: {
            ADPIEID,
          },
        },
      },
    });
    return newAssessment;
  }

  async findAll() {
    const assessments = await this.prisma.assessment.findMany();
    return assessments;
  }

  async findOne(id: number) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { AssessmentID: id },
    });
    return assessment;
  }

  async update(id: number, dto: UpdateAssessmentDto) {
    const updatedAssessment = await this.prisma.assessment.update({
      where: { AssessmentID: id },
      data: dto,
    });
    return updatedAssessment;
  }

  async remove(id: number) {
    const deletedAssessment = await this.prisma.assessment.delete({
      where: { AssessmentID: id },
    });
    return deletedAssessment;
  }
}
