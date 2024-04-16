import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() dto: CreatePatientDto) {
    console.log('controller dto: ', dto);
    return this.patientService.create(dto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.patientService.find(+id);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    console.log('controller update id: ', id);
    console.log('controller update dto: ', dto);
    return this.patientService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('patient delete controller runs w/ id: ', id);
    return this.patientService.remove(+id);
  }
}
