import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto, UpdateAssessmentDto } from './dto';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  create(@Body() dto: CreateAssessmentDto, @Body('ADPIEID') ADPIEID: number) {
    return this.assessmentService.create(dto, ADPIEID);
  }

  @Get()
  findAll() {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assessmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAssessmentDto) {
    return this.assessmentService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(+id);
  }
}
